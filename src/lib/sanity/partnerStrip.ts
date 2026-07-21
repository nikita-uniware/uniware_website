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

function escapeAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function logoHeight(slug: string) {
  return slug === "armis" ? 44 : 28;
}

function logoStyle(slug: string) {
  return slug === "f5" ? ' style="width:28px"' : "";
}

function buildLogoItems(technologies: TechnologyLogo[], decorative: boolean) {
  return technologies
    .map((tech) => {
      const height = logoHeight(tech.slug);
      const style = logoStyle(tech.slug);
      const aria = decorative ? ' aria-hidden="true"' : "";
      const alt = decorative ? "" : escapeAttr(tech.name);
      return `<div class="pf-logo-item"${aria}><img src="${escapeAttr(tech.logoUrl)}" alt="${alt}" height="${height}"${style}></div>`;
    })
    .join("\n        ");
}

/**
 * Build the partner marquee HTML.
 * Repeats the set 4× so the CSS -25% scroll loop stays seamless.
 */
export function buildPartnerStripHtml(technologies: TechnologyLogo[]) {
  const logos =
    technologies.length > 0 ? technologies : LOCAL_TECHNOLOGY_LOGOS;

  const primary = buildLogoItems(logos, false);
  const copies = Array.from({ length: 3 }, () =>
    buildLogoItems(logos, true)
  ).join("\n        ");

  return `<section class="pf" aria-label="Technology ecosystem partners">
  <div class="pf-marquee-col">
    <div class="pf-marquee-track">
      <div class="pf-marquee-row pf-marquee-row--ltr">
        ${primary}
        ${copies}
      </div>
    </div>
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
