export type TechnologyLogo = {
  name: string;
  slug: string;
  logoUrl: string;
};

/** Local partner logos — used when Sanity is empty / unavailable. */
export const LOCAL_TECHNOLOGY_LOGOS: TechnologyLogo[] = [
  { name: "Fortinet", slug: "fortinet", logoUrl: "/partners/logo-1.svg" },
  { name: "CrowdStrike", slug: "crowdstrike", logoUrl: "/partners/logo-2.svg" },
  { name: "Sophos", slug: "sophos", logoUrl: "/partners/logo-3.svg" },
  { name: "Netskope", slug: "netskope", logoUrl: "/partners/logo-4.svg" },
  { name: "Tenable", slug: "tenable", logoUrl: "/partners/logo-5.svg" },
  { name: "Versa", slug: "versa", logoUrl: "/partners/logo-6.svg" },
  { name: "Armis", slug: "armis", logoUrl: "/partners/logo-7.svg" },
  { name: "F5", slug: "f5", logoUrl: "/partners/logo-8.svg" },
];

/**
 * Split a logo list into two marquee rows: first ~50% top, remainder bottom.
 * Odd counts put the extra logo on the top row (e.g. 7 → 4 + 3).
 */
export function splitIntoHalfRows<T>(items: T[]): { top: T[]; bottom: T[] } {
  if (items.length === 0) return { top: [], bottom: [] };
  const mid = Math.ceil(items.length / 2);
  return { top: items.slice(0, mid), bottom: items.slice(mid) };
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildLogoItems(technologies: TechnologyLogo[], decorative: boolean) {
  return technologies
    .map((tech) => {
      const aria = decorative ? ' aria-hidden="true"' : "";
      const alt = decorative ? "" : escapeAttr(tech.name);
      return `<div class="pf-logo-item"${aria}><img src="${escapeAttr(tech.logoUrl)}" alt="${alt}"></div>`;
    })
    .join("\n        ");
}

function buildMarqueeTrack(
  logos: TechnologyLogo[],
  direction: "ltr" | "rtl"
): string {
  if (logos.length === 0) return "";

  // ×4 repeat so the CSS -25% scroll loop stays seamless.
  const primary = buildLogoItems(logos, false);
  const copies = Array.from({ length: 3 }, () =>
    buildLogoItems(logos, true)
  ).join("\n        ");

  return `<div class="pf-marquee-track">
    <div class="pf-marquee-row pf-marquee-row--${direction}">
      ${primary}
      ${copies}
    </div>
  </div>`;
}

/**
 * Build the partner marquee HTML.
 * Top row = first 50% of logos (LTR); bottom row = second 50% (RTL).
 */
export function buildPartnerStripHtml(technologies: TechnologyLogo[]) {
  const logos =
    technologies.length > 0 ? technologies : LOCAL_TECHNOLOGY_LOGOS;
  const { top, bottom } = splitIntoHalfRows(logos);

  const topTrack = buildMarqueeTrack(top, "ltr");
  const bottomTrack = buildMarqueeTrack(bottom, "rtl");

  return `<section class="pf" aria-label="Technology ecosystem partners">
  <div class="pf-marquee-col">
    ${topTrack}
    ${bottomTrack}
  </div>
</section>`;
}

export const PARTNER_STRIP_PLACEHOLDER = "<!--PARTNER_LOGO_STRIP-->";

export function injectPartnerStrip(
  markup: string,
  technologies: TechnologyLogo[]
) {
  const strip = buildPartnerStripHtml(technologies);
  if (markup.includes(PARTNER_STRIP_PLACEHOLDER)) {
    return markup.replace(PARTNER_STRIP_PLACEHOLDER, strip);
  }
  return markup;
}
