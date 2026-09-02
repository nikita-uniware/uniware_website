import type { NextConfig } from "next";
import path from "path";
import { getCutoverRedirects } from "./src/config/cutover-redirects";

const reactShimPath = path.resolve("./src/lib/react-shim.ts");

/**
 * WordPress fallback origin for URLs with no Next.js page yet.
 *
 * Before DNS cutover (testing on global.uniware.net):
 *   WORDPRESS_FALLBACK_ORIGIN=https://uniware.net
 *
 * After uniware.net points at Vercel (go-live):
 *   Swap to the direct AWS IP/hostname from Dhana — NOT uniware.net
 *   (using the public domain after cutover causes a proxy loop).
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
   * Unbuilt pages fall through to the WordPress fallback rewrite below.
   */
  async redirects() {
    return getCutoverRedirects();
  },

  /**
   * Proxy any path with no matching Next.js route to the old WordPress server.
   * Runs only when WORDPRESS_FALLBACK_ORIGIN is set (Vercel env / .env.local).
   */
  async rewrites() {
    const origin = getWordPressFallbackOrigin();
    if (!origin) {
      return { fallback: [] };
    }

    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${origin}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
