import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      // Old paths → permanent IA paths
      {
        source: "/contact",
        destination: "/company/contact",
        permanent: true,
      },
      {
        source: "/contact/",
        destination: "/company/contact",
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
