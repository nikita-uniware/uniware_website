import type { NextConfig } from "next";
import path from "path";
import { getCutoverRedirects } from "./src/config/cutover-redirects";

const reactShimPath = path.resolve("./src/lib/react-shim.ts");

/**
 * WordPress fallback origin for URLs with no Next.js page yet.
 *
 * After DNS cutover, use the direct AWS EC2 address (NOT uniware.net):
 *   WORDPRESS_FALLBACK_ORIGIN=https://13.204.192.228
 *   WORDPRESS_FALLBACK_HOST=ec2-13-204-192-228.ap-south-1.compute.amazonaws.com
 *
 * Do NOT use Host www.uniware.net — that vhost on EC2 now fronts Vercel and loops.
 *
 * Rewrites go through /api/wordpress-proxy so we can set the Host header
 * and absorb WordPress canonical redirects (avoids ERR_TOO_MANY_REDIRECTS).
 */
function getWordPressFallbackOrigin(): string | null {
  const raw = process.env.WORDPRESS_FALLBACK_ORIGIN?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

const nextConfig: NextConfig = {
  // Sanity Studio v6 needs React 19.2's useEffectEvent; Next 15 ships an older compiled React.
  transpilePackages: ["sanity", "@sanity/vision", "next-sanity"],
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^react$/,
          (resource: { context: string; request: string }) => {
            const ctx = resource.context.replace(/\\/g, "/");
            if (/node_modules\/(@sanity|sanity|next-sanity)/.test(ctx)) {
              resource.request = reactShimPath;
            }
          }
        )
      );
    }
    return config;
  },

  /**
   * uniware.net cutover — 301 redirects for rebuilt pages.
   * Unbuilt pages fall through to the WordPress proxy rewrite below.
   */
  async redirects() {
    return getCutoverRedirects();
  },

  /**
   * Proxy any path with no matching Next.js route to the WordPress proxy API
   * (which fetches the EC2 origin with the correct Host header).
   */
  async rewrites() {
    if (!getWordPressFallbackOrigin()) {
      return { fallback: [] };
    }

    return {
      fallback: [
        {
          source: "/:path*",
          destination: "/api/wordpress-proxy/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
