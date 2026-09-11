import http from "node:http";
import https from "node:https";
import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies unbuilt site paths to the old WordPress EC2 server.
 *
 * Plain next.config rewrites fail after DNS cutover because:
 * 1) Host: IP → nginx 404
 * 2) Host: www.uniware.net on this EC2 → Vercel vhost → ERR_TOO_MANY_REDIRECTS
 *
 * Use Host = EC2 public DNS, fetch by IP, and follow WP trailing-slash /
 * canonical redirects internally so the browser never bounces to www.
 *
 * When WordPress has no matching page (404 / soft-404), rewrite to the
 * branded /not-found-fallback page instead of returning the old WP 404.
 *
 * Env:
 *   WORDPRESS_FALLBACK_ORIGIN — e.g. https://13.204.192.228
 *   WORDPRESS_FALLBACK_HOST   — EC2 public DNS (NOT www.uniware.net).
 *     Host www.uniware.net on this box now hits the Vercel vhost → redirect loop.
 *     Default: ec2-13-204-192-228.ap-south-1.compute.amazonaws.com
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REDIRECTS = 8;

const DEFAULT_FALLBACK_HOST =
  "ec2-13-204-192-228.ap-south-1.compute.amazonaws.com";

function getOrigin(): string | null {
  const raw = process.env.WORDPRESS_FALLBACK_ORIGIN?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

function getFallbackHost(): string {
  return process.env.WORDPRESS_FALLBACK_HOST?.trim() || DEFAULT_FALLBACK_HOST;
}

function isOurPublicHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return (
    h === "uniware.net" ||
    h === "www.uniware.net" ||
    h === "global.uniware.net" ||
    h.endsWith(".vercel.app")
  );
}

type UpstreamResult = {
  status: number;
  headers: http.IncomingHttpHeaders;
  body: Buffer;
};

function requestUpstream(
  targetUrl: string,
  method: string,
  hostHeader: string
): Promise<UpstreamResult> {
  const url = new URL(targetUrl);
  const lib = url.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method,
        headers: {
          Host: hostHeader,
          Accept: "*/*",
          "Accept-Encoding": "identity",
          "User-Agent": "UniwareWordPressProxy/1.0",
          Connection: "close",
        },
        timeout: 20000,
        // EC2 may present a cert for uniware.net while we connect by IP
        ...(url.protocol === "https:"
          ? { servername: hostHeader, rejectUnauthorized: false }
          : {}),
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 502,
            headers: res.headers,
            body: Buffer.concat(chunks),
          });
        });
      }
    );

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Upstream timeout"));
    });
    req.end();
  });
}

function shouldFollowInternally(
  hostname: string,
  origin: string,
  fallbackHost: string
): boolean {
  const h = hostname.toLowerCase();
  return (
    isOurPublicHost(h) ||
    h === new URL(origin).hostname.toLowerCase() ||
    h === fallbackHost.toLowerCase() ||
    h.endsWith(".compute.amazonaws.com")
  );
}

/** File with extension — never force a trailing slash (…webp/ → nginx 404). */
function isStaticAssetPath(pathStr: string): boolean {
  const last = pathStr.split("/").pop() || "";
  return /\.[a-z0-9]{1,8}$/i.test(last);
}

function buildTargetUrl(origin: string, pathStr: string, search: string): string {
  if (!pathStr) return `${origin}/${search}`;
  // WP page permalinks prefer trailing slash; static assets must keep the exact path.
  if (isStaticAssetPath(pathStr) || pathStr.endsWith("/")) {
    return `${origin}/${pathStr}${search}`;
  }
  return `${origin}/${pathStr}/${search}`;
}

/** Path we rewrite to when WordPress has no matching page. */
const BRANDED_NOT_FOUND_PATH = "/not-found-fallback";

/**
 * True when WordPress has no real page — HTTP 404/410, or a soft-404 HTML
 * body (old theme returns 200 with “nothing was found at this location”).
 */
function isWordPressMissingPage(upstream: UpstreamResult): boolean {
  if (upstream.status === 404 || upstream.status === 410) return true;
  if (upstream.status !== 200) return false;

  const contentType = upstream.headers["content-type"];
  const ct = Array.isArray(contentType) ? contentType[0] : contentType || "";
  if (!ct.toLowerCase().includes("text/html")) return false;

  const body = upstream.body.toString("utf8").toLowerCase();
  return body.includes("nothing was found at this location");
}

/** Serve our branded 404 HTML (keeps the visitor’s original URL via the
 * outer fallback rewrite; body is our not-found page). */
async function brandedNotFoundResponse(req: NextRequest): Promise<NextResponse> {
  const pageUrl = new URL(BRANDED_NOT_FOUND_PATH, req.nextUrl.origin);
  try {
    const pageRes = await fetch(pageUrl, {
      headers: {
        Accept: "text/html",
        "x-forwarded-host": req.headers.get("host") || req.nextUrl.host,
        "x-forwarded-proto":
          req.headers.get("x-forwarded-proto") || req.nextUrl.protocol.replace(":", ""),
      },
      cache: "no-store",
    });
    const html = await pageRes.text();
    return new NextResponse(html, {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("[wordpress-proxy] branded 404 fetch failed", pageUrl.href, err);
    // Last resort: send the browser to the branded path (URL will change).
    return NextResponse.redirect(pageUrl, 302);
  }
}

async function proxy(
  req: NextRequest,
  pathSegments: string[]
): Promise<NextResponse> {
  const origin = getOrigin();
  if (!origin) {
    return brandedNotFoundResponse(req);
  }

  const fallbackHost = getFallbackHost();
  const pathStr = pathSegments.join("/");
  const search = req.nextUrl.search;
  let targetUrl = buildTargetUrl(origin, pathStr, search);

  try {
    for (let i = 0; i < MAX_REDIRECTS; i++) {
      const upstream = await requestUpstream(targetUrl, req.method, fallbackHost);

      if (upstream.status >= 300 && upstream.status < 400) {
        const location = upstream.headers.location;
        if (!location) break;

        const locationStr = Array.isArray(location) ? location[0] : location;
        const next = new URL(locationStr, targetUrl);

        // Stay on EC2 / public hosts → follow on the IP origin (never bounce to Vercel)
        if (shouldFollowInternally(next.hostname, origin, fallbackHost)) {
          targetUrl = `${origin}${next.pathname}${next.search}`;
          continue;
        }

        // Genuine external redirect
        return NextResponse.redirect(next, upstream.status as 301 | 302 | 307 | 308);
      }

      // WP has no page → branded 404 (HTML only; assets stay a plain 404)
      if (isWordPressMissingPage(upstream)) {
        if (isStaticAssetPath(pathStr)) {
          return new NextResponse("Not Found", { status: 404 });
        }
        return brandedNotFoundResponse(req);
      }

      const headers = new Headers();
      const contentType = upstream.headers["content-type"];
      if (contentType) {
        headers.set(
          "Content-Type",
          Array.isArray(contentType) ? contentType[0] : contentType
        );
      }
      headers.set(
        "Cache-Control",
        isStaticAssetPath(pathStr)
          ? "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
          : "public, s-maxage=60, stale-while-revalidate=300"
      );

      return new NextResponse(new Uint8Array(upstream.body), {
        status: upstream.status,
        headers,
      });
    }

    return new NextResponse("Bad Gateway — too many redirects from WordPress origin", {
      status: 502,
    });
  } catch (err) {
    console.error("[wordpress-proxy]", targetUrl, err);
    return new NextResponse("Bad Gateway — WordPress origin unreachable", {
      status: 502,
    });
  }
}

type Ctx = { params: Promise<{ path?: string[] }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return proxy(req, path);
}

export async function HEAD(req: NextRequest, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return proxy(req, path);
}
