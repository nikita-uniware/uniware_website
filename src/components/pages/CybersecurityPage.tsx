"use client";

import { cybersecurityMarkup } from "@/content/cybersecurity-markup";
import { useCyberPageBehaviors } from "@/hooks/useCyberPageBehaviors";
import {
  injectPartnerStrip,
  type TechnologyLogo,
} from "@/lib/sanity/partnerStrip";
import { SplitCTA } from "@/components/SplitCTA";
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
    <div className="cyber-page">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <SplitCTA
        id="get-started"
        category="cybersecurity"
        primary={{
          eyebrow: "Ready to Talk",
          heading: "Book a security review",
          body: "A structured conversation with one of our engineers. We look at your environment, identify your biggest risks, and tell you what to fix first. No obligation.",
          buttonText: "Book a review",
          buttonLink: "/contact",
        }}
        secondary={{
          eyebrow: "Not Sure Where You Fit",
          heading: "Take the Cyber Readiness Assessment",
          body: "Answer 15 questions about your current setup. Get a clear picture of where you stand and what to prioritise. Takes 3 to 5 minutes.",
          buttonText: "Take the assessment",
          buttonLink: "/solutions/cybersecurity/cyber-readiness-assessment",
        }}
        primaryContact={{
          name: "Nirmal",
          phone: "+91 98408 61475",
        }}
      />
    </div>
  );
}
