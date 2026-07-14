"use client";

import { cybersecurityMarkup } from "@/content/cybersecurity-markup";
import { useCyberPageBehaviors } from "@/hooks/useCyberPageBehaviors";
import "@/styles/cybersecurity.page.css";

/**
 * Cybersecurity page — faithful port of uniware-cybersecurity.html.
 * Markup is generated from the approved reference HTML (nav/footer stripped;
 * those live in the root layout). Behaviors match the reference script:
 * hero reveal on load, scroll reveals, spine/crossbar, WTS rings, carousels.
 */
export function CybersecurityPage() {
  useCyberPageBehaviors();

  return (
    <div
      className="cyber-page"
      dangerouslySetInnerHTML={{ __html: cybersecurityMarkup }}
    />
  );
}
