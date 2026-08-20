"use client";

import { useReveal } from "@/hooks/useReveal";
import { useScrollSyncHighlight } from "@/hooks/useScrollSyncHighlight";
import { CircleGroup } from "@/components/CircleGroup";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cloud-infrastructure.page.css";

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DownArrow = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 2.5V11.5M7 11.5L2.5 7M7 11.5L11.5 7" />
  </svg>
);

type CloudModel = {
  key: string;
  tier: "base" | "mid";
  stackLabel: string;
  eyebrow: string;
  heading: string;
  description: string;
  bullets: string[];
  vendors: string[];
  crossLink?: string;
};

const CLOUD_MODELS: CloudModel[] = [
  {
    key: "private",
    tier: "base",
    stackLabel: "Private",
    eyebrow: "PRIVATE CLOUD",
    heading: "Your infrastructure, your control",
    description:
      "Deployed on-premises, owned and managed by your organisation. The right call when data sensitivity or regulation demands maximum control.",
    bullets: [
      "Full infrastructure ownership",
      "Maximum data control and governance",
      "Best fit for regulated industries",
      "Higher upfront investment, in-house expertise required",
    ],
    vendors: ["Dell", "VMware"],
  },
  {
    key: "public",
    tier: "base",
    stackLabel: "Public",
    eyebrow: "PUBLIC CLOUD",
    heading: "Scale without owning hardware",
    description:
      "Compute, storage, and networking delivered as a service. The provider carries the infrastructure cost and complexity, you carry what runs on it.",
    bullets: [
      "Pay only for what you use",
      "Scale up or down on demand",
      "No capital expense on hardware",
      "VPC gives you private-cloud-level control inside a public environment",
    ],
    vendors: ["AWS", "Azure"],
  },
  {
    key: "hybrid",
    tier: "base",
    stackLabel: "Hybrid",
    eyebrow: "HYBRID CLOUD",
    heading: "The best of both, properly integrated",
    description:
      "Sensitive or mission-critical workloads stay on private infrastructure. Everything else scales on public cloud. Integration is what makes this actually work, not just running two environments side by side.",
    bullets: [
      "Regulated workloads stay private",
      "Dynamic workloads scale on public cloud",
      "Cloud bursting for demand spikes",
      "One coherent architecture, not two disconnected environments",
    ],
    vendors: ["AWS", "Azure", "VMware"],
    crossLink: "For connectivity between environments, see Cloud Networking.",
  },
  {
    key: "multi-cloud",
    tier: "mid",
    stackLabel: "Multi-Cloud",
    eyebrow: "MULTI-CLOUD",
    heading: "Not locked to one provider",
    description:
      "Running workloads across more than one public cloud provider, placing each on the platform that handles it best.",
    bullets: [
      "Reduced vendor lock-in",
      "Each workload placed on its best-fit platform",
      "Unified management across providers",
      "Consistent security policy across environments",
    ],
    vendors: ["AWS", "Azure"],
  },
];

// DEV-ONLY PLACEHOLDER — no cloud-tagged case studies exist yet. Replace
// with real Sanity content once available (same pattern as the vendor
// logo placeholders below: TODO markers, easy to find, easy to delete).
type CaseStudyPlaceholder = {
  eyebrow: string;
  stat: string;
  statCaption: string;
  body: string;
  pills: [string, string];
};

const CASE_STUDY_PLACEHOLDERS: CaseStudyPlaceholder[] = [
  {
    eyebrow: "Cloud Infrastructure",
    stat: "Placeholder",
    statCaption: "Details pending",
    body: "Draft: cloud migration for a mid-market manufacturer, timeline and outcome to confirm once the real case study is written.",
    pills: ["Cloud", "Infrastructure"],
  },
  {
    eyebrow: "Hybrid Cloud",
    stat: "Placeholder",
    statCaption: "Details pending",
    body: "Draft: hybrid environment build for a logistics client.",
    pills: ["Hybrid", "Cloud"],
  },
];

export function CloudInfrastructurePage() {
  useReveal();

  const scrollSync = useScrollSyncHighlight({
    triggerSelector: "[data-pillar-trigger].dci-pillar",
    triggerAttr: "pillar-trigger",
    companionSelector:
      "[data-pillar-trigger].dci-stack-block, [data-pillar-trigger].dci-stack-security",
    companionAttr: "pillar-trigger",
    activeClass: "is-current",
    requireIntersection: true,
  });

  function handleSegmentClick(key: string) {
    scrollSync.setActive(key);
    const target = document.getElementById(`pillar-${key}`);
    if (!target) return;
    const navHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--uw-nav-height"
      )
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="dci-page cloud-infra-page">
      <section className="hero" aria-labelledby="cloud-infra-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            CLOUD INFRASTRUCTURE
          </p>
          <h1
            className="hero-headline"
            data-reveal="80"
            id="cloud-infra-hero-heading"
          >
            Private, public, or hybrid.
            <br />
            <span className="amber">Built the right way.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            Scalable IaaS on AWS and Azure, sized to what you actually run,
            not what&apos;s easiest to sell you.
          </p>
          <span data-reveal="240">
            <a
              href="/contact"
              className="btn-size-lg btn-surface-dark"
              onClick={(e) => {
                e.preventDefault();
                window.openBookingPanel("cloud");
              }}
            >
              Talk to an expert
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </span>
        </div>
        <CircleGroup size="xl" surface="dark" position="bottom-right" enterAnimation />
      </section>

      <section className="dci-badges" aria-label="Certified partner accreditations">
        <div className="container">
          <div className="dci-badges-row">
            <div className="dci-badge">
              <img
                src="/partners/aws-advanced-tier-partner.png"
                alt="AWS Advanced Tier Partner"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">AWS Advanced Tier Partner</p>
              </div>
            </div>

            <div className="dci-badge">
              <img
                src="/partners/aws-solutions-architect-professional.png"
                alt="AWS Certified Solutions Architect – Professional"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">Solutions Architect Professional</p>
              </div>
            </div>

            <div className="dci-badge">
              <img
                src="/partners/aws-well-architected-proficient.png"
                alt="AWS Well-Architected Proficient"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">Well-Architected Proficient</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dci-stack-pillars" aria-labelledby="cloud-infra-stack-heading">
        <div className="container">
          <div className="dci-stack-header">
            <div className="dci-stack-copy">
              <p className="sec-eyebrow-l" data-reveal="0">
                CLOUD MODELS
              </p>
              <h2 className="sec-heading-l" id="cloud-infra-stack-heading" data-reveal="0">
                3 models. 1 decision.
              </h2>
              <p className="sec-sub-l" data-reveal="0">
                Every cloud strategy starts here. We help you pick the right
                one and design around it properly, not just deploy whatever&apos;s
                fastest to sell.
              </p>
            </div>

            <div className="dci-stack-diagram-col">
              <div className="dci-stack-wrap" data-reveal="0">
                <div className="dci-stack-base-row">
                  {CLOUD_MODELS.slice(0, 3).map((m) => (
                    <div
                      key={m.key}
                      className={`dci-stack-block dci-tier-${m.tier}`}
                      data-pillar-trigger={m.key}
                      onClick={() => handleSegmentClick(m.key)}
                    >
                      <span className="dci-stack-label">
                        {m.stackLabel}
                        <span className="dci-stack-arrow">
                          <DownArrow />
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={`dci-stack-security dci-tier-${CLOUD_MODELS[3].tier}`}
                  data-pillar-trigger={CLOUD_MODELS[3].key}
                  onClick={() => handleSegmentClick(CLOUD_MODELS[3].key)}
                >
                  <span className="dci-stack-label">
                    {CLOUD_MODELS[3].stackLabel}
                    <span className="dci-stack-arrow">
                      <DownArrow />
                    </span>
                  </span>
                  <p className="dci-stack-security-sub">Combine any of the above</p>
                </div>
              </div>

              <div className="dci-connector" aria-hidden="true" />
            </div>
          </div>

          <div className="dci-group-wrap">
            <div className="dci-group">
              {CLOUD_MODELS.map((m) => (
                <div
                  key={m.key}
                  id={`pillar-${m.key}`}
                  className="dci-cell dci-pillar"
                  data-pillar-trigger={m.key}
                >
                  <div className="dci-pillar-grid">
                    <div className="dci-pillar-copy">
                      <p className="sec-eyebrow-l">{m.eyebrow}</p>
                      <h3 className="dci-pillar-heading">{m.heading}</h3>
                      <p className="dci-pillar-desc">{m.description}</p>
                      <ul className="cs-results">
                        {m.bullets.map((b) => (
                          <li key={b}>
                            <CheckIcon />
                            {b}
                          </li>
                        ))}
                      </ul>
                      {m.crossLink && (
                        <p className="dci-pillar-crosslink">{m.crossLink}</p>
                      )}
                    </div>

                    <div className="dci-pillar-media">
                      <div className="dci-pillar-vendors">
                        {m.vendors.map((v) => (
                          <div className="cs-stack-chip" key={v}>
                            <span className="cs-stack-chip-logo">{v}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        className="link-text link-text-light link-text-md dci-pillar-cta"
                        href="/contact"
                        onClick={(e) => {
                          e.preventDefault();
                          window.openBookingPanel("cloud");
                        }}
                      >
                        Talk to an expert
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path
                            d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CircleGroup size="lg" surface="light" position="bottom-right" bleedMultiplier={0.45} />
          </div>
        </div>
      </section>

      {/* DEV-ONLY PLACEHOLDER — no cloud-tagged case studies exist yet.
          Swap CASE_STUDY_PLACEHOLDERS above for real Sanity content once
          it's live, same as Networking/Operations/Security will need. */}
      <section id="case-studies" className="cs" aria-labelledby="cloud-infra-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Case Studies</p>
              <h2 className="sec-heading-d" id="cloud-infra-cs-heading">
                Placeholder — replace once cloud case studies are live
              </h2>
            </div>
          </div>

          <div className="cs-grid">
            {CASE_STUDY_PLACEHOLDERS.map((c) => (
              <div data-reveal="0" key={c.eyebrow}>
                <div className="cs-card">
                  <a
                    href="#"
                    className="card-overlay-link"
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={(e) => e.preventDefault()}
                  />
                  <div className="cs-badge" aria-hidden="true">
                    <svg
                      className="cs-badge-stroke"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
                    </svg>
                    <svg
                      className="cs-badge-fill"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
                    </svg>
                  </div>
                  <p className="cs-eyebrow">{c.eyebrow}</p>
                  <p className="cs-stat">{c.stat}</p>
                  <p className="cs-stat-caption">{c.statCaption}</p>
                  <p className="cs-body">{c.body}</p>
                  <div className="cs-pills">
                    <span className="cs-pill">{c.pills[0]}</span>
                    <span className="cs-pill">{c.pills[1]}</span>
                  </div>
                  <div className="cs-cta card-cta">
                    <a
                      href="#"
                      className="link-text link-text-dark link-text-sm link-text--external"
                      onClick={(e) => e.preventDefault()}
                    >
                      Read a case study
                      <span className="link-text-arrow-wrap">
                        <svg
                          className="link-text-arrow-default"
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 2.5L11.5 7M11.5 7L7 11.5M11.5 7H2.5" />
                        </svg>
                        <svg
                          className="link-text-arrow-hover"
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 11L11 3M11 3H5M11 3V9" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PrimaryCTA
        heading="Ready to talk about your cloud infrastructure?"
        body="Tell us what you're running, or what you're trying to move. We'll bring in the right person."
        buttonText="Talk to an expert"
        buttonLink="/contact"
        category="cloud"
      />
    </div>
  );
}
