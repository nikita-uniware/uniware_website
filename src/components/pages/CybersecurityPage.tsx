"use client";

import { cybersecurityMarkup } from "@/content/cybersecurity-markup";
import { useCyberPageBehaviors } from "@/hooks/useCyberPageBehaviors";
import {
  injectPartnerStrip,
  type TechnologyLogo,
} from "@/lib/sanity/partnerStrip";
import "@/styles/cybersecurity.page.css";

type CybersecurityPageProps = {
  technologies: TechnologyLogo[];
};

/**
 * Cybersecurity page — faithful port of uniware-cybersecurity.html (v1.3).
 * Markup is generated from the approved reference HTML (nav/footer stripped;
 * those live in the root layout). Partner logos are injected from Sanity
 * (with a local fallback). Behaviors match the reference script:
 * hero reveal on load, scroll reveals, spine/crossbar, WTS rings, carousels.
 */
export function CybersecurityPage({ technologies }: CybersecurityPageProps) {
  useCyberPageBehaviors();

  const html = injectPartnerStrip(cybersecurityMarkup, technologies);

  return (
    <div
      className="cyber-page"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
