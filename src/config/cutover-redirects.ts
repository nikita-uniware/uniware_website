/**
 * uniware.net cutover — 301 redirects for rebuilt pages.
 * Source: Uniware_Cutover_Plan_For_Srimathi.md
 *
 * Rule: only URLs where a real Next.js page exists. Everything else is
 * handled by the WordPress fallback rewrite in next.config.ts.
 */

export type CutoverRedirect = {
  source: string;
  destination: string;
};

/** Pairs from the cutover plan (sources may include trailing slashes). */
const CUTOVER_PAIRS: CutoverRedirect[] = [
  // ── Cybersecurity (consolidated page) ──
  { source: "/sentinel-one-edr", destination: "/solutions/cybersecurity" },
  { source: "/crowdstrike-edr", destination: "/solutions/cybersecurity" },
  { source: "/email-security", destination: "/solutions/cybersecurity" },
  {
    source: "/zero-trust-network-access-solutions",
    destination: "/solutions/cybersecurity",
  },
  { source: "/cyber-security-services", destination: "/solutions/cybersecurity" },
  { source: "/cyber-security-consulting", destination: "/solutions/cybersecurity" },
  { source: "/cloud-security.html", destination: "/solutions/cybersecurity" },
  { source: "/cloud_security.html", destination: "/solutions/cybersecurity" },
  { source: "/vapt-services-bangalore", destination: "/solutions/cybersecurity" },
  {
    source: "/security-incident-response-services-bangalore",
    destination: "/solutions/cybersecurity",
  },
  {
    source: "/cyber-security-services-bangalore",
    destination: "/solutions/cybersecurity",
  },
  {
    source: "/email-security-services-bangalore",
    destination: "/solutions/cybersecurity",
  },
  {
    source: "/proofpoint-partners-bangalore",
    destination: "/solutions/cybersecurity",
  },

  // ── Cloud Security (own page) ──
  { source: "/cloud-security-services", destination: "/solutions/cloud/security" },
  {
    source: "/crowdstrike-cloud-security",
    destination: "/solutions/cloud/security",
  },
  {
    source: "/solutions/crowdstrike-cloud-security",
    destination: "/solutions/cloud/security",
  },
  {
    source: "/navigating-cloud-security-strategies",
    destination: "/solutions/cloud/security",
  },
  {
    source: "/hybrid-cloud-infrastructure-security",
    destination: "/solutions/cloud/security",
  },
  {
    source: "/sentinel-one-cloud-security",
    destination: "/solutions/cloud/security",
  },

  // ── Cloud hub and Infrastructure ──
  { source: "/cloud-service-provider.html", destination: "/solutions/cloud" },
  {
    source: "/cloud_infrastructure.html",
    destination: "/solutions/cloud/infrastructure",
  },
  {
    source: "/cloud-infrastructure.html",
    destination: "/solutions/cloud/infrastructure",
  },
  {
    source: "/cloud-infrastructure-service",
    destination: "/solutions/cloud/infrastructure",
  },
  {
    source: "/software-defined-data-center-sddc",
    destination: "/solutions/cloud/infrastructure",
  },
  {
    source: "/dedicated-storage-device-providers.html",
    destination: "/solutions/data-centre-infrastructure",
  },

  // ── Cloud Networking ──
  { source: "/cloud-networking", destination: "/solutions/cloud/networking" },
  {
    source: "/solutions/network-connectivity",
    destination: "/solutions/cloud/networking",
  },
  {
    source: "/software-defined-networking-sdn",
    destination: "/solutions/cloud/networking",
  },

  // ── Cloud Operations ──
  { source: "/cloud-operations", destination: "/solutions/cloud/operations" },

  // ── AWS Hub and Services ──
  { source: "/aws", destination: "/solutions/cloud/aws" },
  { source: "/aws-cloud-services-chennai", destination: "/solutions/cloud/aws" },
  {
    source: "/aws-migration-modernization-chennai",
    destination: "/solutions/cloud/aws/services/migration",
  },
  {
    source: "/aws-cloud-migration-service",
    destination: "/solutions/cloud/aws/services/migration",
  },
  {
    source: "/aws-cloud-migration-service-chennai",
    destination: "/solutions/cloud/aws/services/migration",
  },
  {
    source: "/aws-migration-modernization-duplicate-2354",
    destination: "/solutions/cloud/aws/services/migration",
  },
  {
    source: "/aws-cloud-managed-services-chennai",
    destination: "/solutions/cloud/aws/services/managed-services",
  },
  {
    source: "/aws-cloud-consulting-services",
    destination: "/solutions/cloud/aws/services/consulting",
  },
  {
    source: "/aws-cloud-consulting-services-chennai",
    destination: "/solutions/cloud/aws/services/consulting",
  },

  // ── AWS Workloads ──
  { source: "/aws-rds", destination: "/solutions/cloud/aws/workloads/rds" },
  {
    source: "/aws-rds-duplicate-1980",
    destination: "/solutions/cloud/aws/workloads/rds",
  },
  // Tentative — confirm with Dhana (page title says "Amazon RDS Services"):
  {
    source: "/aws-system-manager",
    destination: "/solutions/cloud/aws/workloads/rds",
  },
  { source: "/aws-gen-ai", destination: "/solutions/cloud/aws/workloads/genai" },

  // ── Weak-traffic AWS → hub ──
  { source: "/aws-waf-service", destination: "/solutions/cloud/aws" },
  { source: "/aws-waf-service-duplicate-2100", destination: "/solutions/cloud/aws" },
  { source: "/aws-lightsail-partner-chennai", destination: "/solutions/cloud/aws" },
  { source: "/aws-cloudfront", destination: "/solutions/cloud/aws" },
];

/** Existing redirects from URL audit v1 and interim dev routes. */
const LEGACY_PAIRS: CutoverRedirect[] = [
  { source: "/company/contact", destination: "/contact" },
  { source: "/cybersecurity", destination: "/solutions/cybersecurity" },
  {
    source: "/incident-readiness/assessment",
    destination: "/solutions/cybersecurity/cyber-readiness-assessment",
  },
  { source: "/case-studies", destination: "/resources/case-studies" },
  { source: "/case-studies/:slug", destination: "/resources/case-studies/:slug" },
  {
    source: "/resources/case-studies/ransomware-recovery-manufacturing",
    destination: "/resources/case-studies/ransomware-recovery-chemical-manufacturing",
  },
  {
    source: "/resources/case-studies/manufacturing-ransomware-recovery",
    destination: "/resources/case-studies/ransomware-recovery-chemical-manufacturing",
  },
];

function expandSlashVariants(pairs: CutoverRedirect[]): CutoverRedirect[] {
  const seen = new Set<string>();
  const out: CutoverRedirect[] = [];

  for (const { source, destination } of pairs) {
    const dest = destination.replace(/\/+$/, "") || "/";
    const hasDynamic = source.includes(":");
    const isHtml = /\.html$/i.test(source);
    const base = source.replace(/\/+$/, "");

    const variants = hasDynamic
      ? [base]
      : isHtml
        ? [base, `${base}/`]
        : [base, `${base}/`];

    for (const src of variants) {
      const key = `${src}→${dest}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ source: src, destination: dest });
    }
  }

  return out;
}

/** All permanent redirects for next.config.ts */
export function getCutoverRedirects() {
  return expandSlashVariants([...LEGACY_PAIRS, ...CUTOVER_PAIRS]).map(
    ({ source, destination }) => ({
      source,
      destination,
      permanent: true as const,
    })
  );
}
