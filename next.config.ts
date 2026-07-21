import type { NextConfig } from "next";
import path from "path";

const reactShimPath = path.resolve("./src/lib/react-shim.ts");

const nextConfig: NextConfig = {
  // Sanity Studio v6 needs React 19.2's useEffectEvent; Next 15 ships an older compiled React.
  transpilePackages: ["sanity", "@sanity/vision", "next-sanity"],
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^react$/, (resource) => {
          const ctx = resource.context.replace(/\\/g, "/");
          if (/node_modules\/(@sanity|sanity|next-sanity)/.test(ctx)) {
            resource.request = reactShimPath;
          }
        })
      );
    }
    return config;
  },
  /**
   * URL audit v1 (Niki) — Section 4 redirect rules.
   * Living document: add rows as new pages ship.
   */
  async redirects() {
    return [
      // No homepage yet — temporary until / is built
      {
        source: "/",
        destination: "/solutions/cybersecurity",
        permanent: false, // 307
      },
      // Old /company/contact → /contact (Niki contact page ship)
      {
        source: "/company/contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/company/contact/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/cybersecurity",
        destination: "/solutions/cybersecurity",
        permanent: true,
      },
      {
        source: "/cybersecurity/",
        destination: "/solutions/cybersecurity",
        permanent: true,
      },
      {
        source: "/incident-readiness/assessment",
        destination: "/solutions/cybersecurity/security-assessment",
        permanent: true,
      },
      {
        source: "/incident-readiness/assessment/",
        destination: "/solutions/cybersecurity/security-assessment",
        permanent: true,
      },
      // Interim dev routes from Phase 1 build
      {
        source: "/case-studies",
        destination: "/resources/case-studies",
        permanent: true,
      },
      {
        source: "/case-studies/:slug",
        destination: "/resources/case-studies/:slug",
        permanent: true,
      },
      // Slug correction (lead update after URL audit v1)
      {
        source: "/resources/case-studies/ransomware-recovery-manufacturing",
        destination:
          "/resources/case-studies/ransomware-recovery-chemical-manufacturing",
        permanent: true,
      },
      {
        source: "/resources/case-studies/manufacturing-ransomware-recovery",
        destination:
          "/resources/case-studies/ransomware-recovery-chemical-manufacturing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
