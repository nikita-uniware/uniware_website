"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { useScrollSyncHighlight } from "@/hooks/useScrollSyncHighlight";
import { CircleGroup } from "@/components/CircleGroup";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import type {
  InfrastructurePillarId,
  InfrastructureTechnologyLogo,
} from "@/lib/sanity";
import "@/styles/cybersecurity.page.css";
import "@/styles/data-centre-infrastructure.page.css";

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

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 2.5V13.5M2.5 8H13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Same downward-arrow path already used as link-text--anchor's hover icon.
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

type Pillar = {
  key: InfrastructurePillarId;
  tier: "base" | "mid" | "deep";
  stackLabel: string;
  eyebrow: string;
  heading: string;
  description: string;
  bullets: string[];
  crossLink?: string;
};

const PILLARS: Pillar[] = [
  {
    key: "server",
    tier: "base",
    stackLabel: "Server",
    eyebrow: "SERVER",
    heading: "The compute your business runs on",
    description:
      "Physical servers sized right for your workload, not over-bought, not under-powered, built to support everything running on top of them.",
    bullets: [
      "Physical server deployment and racking",
      "Right-sized hardware selection for the workload",
      "Enterprise rack and data center setup",
      "Lifecycle planning for hardware refreshes",
    ],
  },
  {
    key: "storage",
    tier: "base",
    stackLabel: "Storage",
    eyebrow: "STORAGE",
    heading: "Storage that scales with you",
    description:
      "From a single array to a fully designed SAN, we design storage that keeps pace as your data grows, and stays ready to back up and recover when it matters. Built on Dell PowerStore, PowerScale, and PowerVault, alongside NetApp, Hitachi, Qnap, and Synology.",
    bullets: [
      "Primary storage deployment and sizing",
      "SAN solution design, matched to your use case",
      "Storage built to plug straight into backup and disaster recovery",
      "Capacity planning as data grows",
    ],
  },
  {
    key: "network",
    tier: "base",
    stackLabel: "Network",
    eyebrow: "NETWORKING",
    heading: "The connections that hold it together",
    description:
      "From the office floor to the data center core, we design networks that stay fast, reliable, and ready to grow, wired, wireless, and everything in between. Built on Dell, HPE Aruba, and Arista VeloCloud.",
    bullets: [
      "Campus switching and wireless for the office floor",
      "InfiniBand switch design",
      "Branch connectivity and SD-WAN, software-defined networking, for multi-site businesses",
      "PoE switches for connected devices like Wi-Fi access points, security cameras, and access control systems",
    ],
  },
  {
    key: "virtualization",
    tier: "mid",
    stackLabel: "Virtualization / HCI",
    eyebrow: "VIRTUALIZATION / HCI",
    heading: "One platform, not three",
    description:
      "Hyperconverged infrastructure (HCI) combines your compute, storage, and networking into a single, simplified cluster, easier to manage, and easier to scale as you grow.",
    bullets: [
      "Hyperconverged infrastructure (HCI) deployment",
      "Traditional virtualization, for teams not ready to move off it yet",
      "Migration from ageing three-tier setups with zero downtime",
      "Spin up compute elastically in AWS when a workload needs extra capacity, then scale back down",
      "Container orchestration with Kubernetes",
    ],
  },
  {
    key: "data-security",
    tier: "deep",
    stackLabel: "Data security",
    eyebrow: "DATA SECURITY",
    heading: "Backed up, and ready to recover",
    description:
      "Backups only matter if they actually restore. We design backup and disaster recovery that follows the 3-2-1 rule, so your data survives whatever happens to your primary systems.",
    bullets: [
      "Backup and disaster recovery hardware and software deployment",
      "Immutable, tamper-proof backup copies",
      "Disaster recovery site setup and replication",
      "Deduplication for longer backup retention at a lower cost",
      "Faster backups after the first, source-based deduplication only sends what's changed",
    ],
    crossLink:
      "For the deeper story on ransomware recovery and cyber resiliency, see Cybersecurity.",
  },
];

type CaseStudySupporting = {
  pillar: string;
  statHeadline: string;
  statCaption: string;
  context: string;
  pills: [string, string];
  url: string;
};

const CASE_STUDY_SUPPORTING: CaseStudySupporting[] = [
  {
    pillar: "VIRTUALIZATION / HCI",
    statHeadline: "50% faster",
    statCaption: "One platform, not three",
    context: "A 3-node Nutanix cluster, zero downtime.",
    pills: ["Zero downtime", "10U → 6U rack space"],
    url: "/resources/case-studies/shipbuilding-nutanix-hci-modernisation",
  },
  {
    pillar: "STORAGE",
    statHeadline: "90% faster",
    statCaption: "Archive retrieval, from 8 hours to 15 minutes",
    context:
      "An 8-year-old tape library, replaced with Dell PowerScale across two sites.",
    pills: ["1PB total capacity", "Zero downtime for archive access"],
    url: "/resources/case-studies/media-broadcaster-dell-powerscale-archive",
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore as well. We opened in London, UK in August 2026, and we're now doing business here. We work with clients across India, the US, and the UK, and remotely with businesses wherever they're based.",
  },
];

type InfrastructurePageProps = {
  technologies: InfrastructureTechnologyLogo[];
};

export function InfrastructurePage({ technologies }: InfrastructurePageProps) {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // The middle-left circle behind the Network card sits as a sibling of
  // .dci-group (same level as the bottom-right circle, whose stacking
  // already works correctly) rather than nested inside the Network cell —
  // nesting it there trapped it in Network's own stacking context, hiding
  // it from being reliably out-ranked by sibling cards. Being a sibling
  // means its vertical center must be measured, since Network isn't at
  // the group's own 50% height.
  const networkCellRef = useRef<HTMLDivElement>(null);
  const groupWrapRef = useRef<HTMLDivElement>(null);
  const [networkCenterTop, setNetworkCenterTop] = useState<number | null>(
    null
  );

  useEffect(() => {
    function measure() {
      const cell = networkCellRef.current;
      const wrap = groupWrapRef.current;
      if (!cell || !wrap) return;
      const cellRect = cell.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      setNetworkCenterTop(
        cellRect.top - wrapRect.top + cellRect.height / 2
      );
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrollSync = useScrollSyncHighlight({
    triggerSelector: "[data-pillar-trigger].dci-pillar",
    triggerAttr: "pillar-trigger",
    companionSelector:
      "[data-pillar-trigger].dci-stack-segment, [data-pillar-trigger].dci-stack-block",
    companionAttr: "pillar-trigger",
    activeClass: "is-current",
    requireIntersection: true,
  });

  function handleSegmentClick(key: string) {
    scrollSync.setActive(key);
    const target = document.getElementById(`pillar-${key}`);
    if (!target) return;
    // Manual scrollTo instead of target.scrollIntoView(): replicates the
    // same scroll-margin-top offset, but goes through the window's own
    // smooth-scroll path rather than Element.scrollIntoView()'s, which
    // left a stale paint in the overflow:hidden section above (see fix
    // history for the padding-loss bug this replaced).
    const navHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--uw-nav-height"
      )
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }


  return (
    <div className="dci-page">
      <section className="hero" aria-labelledby="dci-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            DATA CENTRE INFRASTRUCTURE
          </p>
          <h1 className="hero-headline" data-reveal="80" id="dci-hero-heading">
            Everything your data center needs, <span className="amber">in one place.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            Server, storage, network, and virtualization, backed by three
            decades of experience and the data security to protect it all.
          </p>
          <span data-reveal="240">
            <a
              href="/contact"
              className="btn-size-lg btn-surface-dark"
              onClick={(e) => {
                e.preventDefault();
                window.openBookingPanel("datacenter");
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
                src="/partners/dell-platinum-partner.png"
                alt="Dell Technologies Platinum Partner"
                className="h-12 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#0076CE]">Dell Technologies Platinum Partner</p>
              </div>
            </div>

            <div className="dci-badge">
              <img
                src="/partners/aws-advanced-tier-partner.png"
                alt="AWS Advanced Tier Partner"
                className="h-12 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">AWS Advanced Tier Partner</p>
              </div>
            </div>

            <div className="dci-badge">
              <img
                src="/partners/commvault-premier-solutions-partner.png"
                alt="Commvault Premier Solutions Partner"
                className="h-12 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#6B2D8B]">Commvault Premier Solutions Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats stats--dark" aria-label="Track record">
        <div className="container">
          <div className="stats-grid">
            <div className="stats-left" data-reveal="0">
              <p className="stats-eyebrow">Track Record</p>
              <h2 className="stats-heading">
                Over 500 companies have trusted us with their infrastructure.
              </h2>
              <p className="stats-body">
                Since 1995, we&apos;ve designed, deployed, and maintained IT
                infrastructure for SMB and enterprise businesses. Servers,
                storage, networks, virtualisation, and the data protection
                that holds it all together.
              </p>
            </div>
            <div className="stats-right">
              <div className="stat-card" data-reveal="0">
                <div className="stat-number">500+</div>
                <div className="stat-label">Companies served</div>
              </div>
              <div className="stat-card" data-reveal="80">
                <div className="stat-number">30 years</div>
                <div className="stat-label">In IT infrastructure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dci-stack-pillars" aria-labelledby="dci-stack-heading">
        <div className="container">
          <div className="dci-stack-header">
            <div className="dci-stack-copy">
              <p className="sec-eyebrow-l" data-reveal="0">
                THE STACK
              </p>
              <h2 className="sec-heading-l" id="dci-stack-heading" data-reveal="0">
                Five parts, working as one platform
              </h2>
              <p className="sec-sub-l" data-reveal="0">
                Server, storage, and network form the base. Virtualization ties
                them together. Data security protects the whole thing.
              </p>
            </div>

            <div className="dci-stack-diagram-col">
              <div className="dci-stack-wrap" data-reveal="0">
                <div className="dci-stack-base-row">
                  <div
                    className={`dci-stack-block dci-tier-${PILLARS[0].tier}`}
                    data-pillar-trigger={PILLARS[0].key}
                    onClick={() => handleSegmentClick(PILLARS[0].key)}
                  >
                    <span className="dci-stack-label">
                      {PILLARS[0].stackLabel}
                      <span className="dci-stack-arrow">
                        <DownArrow />
                      </span>
                    </span>
                  </div>
                  <div
                    className={`dci-stack-block dci-tier-${PILLARS[1].tier}`}
                    data-pillar-trigger={PILLARS[1].key}
                    onClick={() => handleSegmentClick(PILLARS[1].key)}
                  >
                    <span className="dci-stack-label">
                      {PILLARS[1].stackLabel}
                      <span className="dci-stack-arrow">
                        <DownArrow />
                      </span>
                    </span>
                  </div>
                  <div
                    className={`dci-stack-block dci-tier-${PILLARS[2].tier}`}
                    data-pillar-trigger={PILLARS[2].key}
                    onClick={() => handleSegmentClick(PILLARS[2].key)}
                  >
                    <span className="dci-stack-label">
                      {PILLARS[2].stackLabel}
                      <span className="dci-stack-arrow">
                        <DownArrow />
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className={`dci-stack-block dci-tier-${PILLARS[3].tier}`}
                  data-pillar-trigger={PILLARS[3].key}
                  onClick={() => handleSegmentClick(PILLARS[3].key)}
                >
                  <span className="dci-stack-label">
                    {PILLARS[3].stackLabel}
                    <span className="dci-stack-arrow">
                      <DownArrow />
                    </span>
                  </span>
                </div>

                <div
                  className={`dci-stack-security dci-tier-${PILLARS[4].tier}`}
                  data-pillar-trigger={PILLARS[4].key}
                  onClick={() => handleSegmentClick(PILLARS[4].key)}
                >
                  <span className="dci-stack-label">
                    Data Security
                    <span className="dci-stack-arrow">
                      <DownArrow />
                    </span>
                  </span>
                  <p className="dci-stack-security-sub">Protects everything above</p>
                </div>
              </div>

              <div className="dci-connector" aria-hidden="true" />
            </div>
          </div>

          <div className="dci-group-wrap" ref={groupWrapRef}>
            <div className="dci-group">
              {PILLARS.map((p) => (
                <div
                  key={p.key}
                  id={`pillar-${p.key}`}
                  className="dci-cell dci-pillar"
                  data-pillar-trigger={p.key}
                  ref={p.key === "network" ? networkCellRef : undefined}
                >
                  <div className="dci-pillar-grid">
                    <div className="dci-pillar-copy">
                      <p className="sec-eyebrow-l">{p.eyebrow}</p>
                      <h3 className="dci-pillar-heading">{p.heading}</h3>
                      <p className="dci-pillar-desc">{p.description}</p>
                      <ul className="cs-results">
                        {p.bullets.map((b) => (
                          <li key={b}>
                            <CheckIcon />
                            {b}
                          </li>
                        ))}
                      </ul>
                      {p.crossLink && (
                        <p className="dci-pillar-crosslink">{p.crossLink}</p>
                      )}
                    </div>

                    <div className="dci-pillar-media">
                      {technologies.some((technology) =>
                        technology.infrastructurePillars.includes(p.key)
                      ) && (
                        <div
                          className="dci-pillar-vendors"
                          aria-label={`${p.stackLabel} technology partners`}
                        >
                          {technologies
                            .filter((technology) =>
                              technology.infrastructurePillars.includes(p.key)
                            )
                            .map((technology) => (
                              <div className="cs-stack-chip" key={technology.slug}>
                                <span className="cs-stack-chip-logo">
                                  <img
                                    src={technology.logoUrl}
                                    alt={technology.name}
                                    loading="lazy"
                                  />
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                      <a
                        className="link-text link-text-light link-text-md dci-pillar-cta"
                        href="/contact"
                        onClick={(e) => {
                          e.preventDefault();
                          window.openBookingPanel("datacenter", p.key);
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
            <CircleGroup
              size="lg"
              surface="light"
              position="middle-left"
              bleedMultiplier={0.45}
              style={{
                // 180 = lg outer/2 (360/2) — this instance is always "lg".
                top:
                  networkCenterTop !== null
                    ? networkCenterTop - 180
                    : undefined,
                visibility: networkCenterTop !== null ? "visible" : "hidden",
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </section>

      <section id="case-studies" className="cs" aria-labelledby="dci-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">CASE STUDIES</p>
              <h2 className="sec-heading-d" id="dci-cs-heading">
                Over <span className="amber">200 companies</span> have trusted us with
                their infrastructure. 30 years and counting.
              </h2>
            </div>
          </div>

          <div className="dci-cs-grid">
            <Link
              href="/resources/case-studies/schwing-stetter-dell-data-protection-backup"
              className="cs-card"
              data-reveal="0"
            >
              <p className="cs-eyebrow">DATA SECURITY</p>
              <p className="cs-stat">85% faster</p>
              <p className="cs-stat-caption">Backup window, down from 6 hours</p>
              <p className="cs-outcome">
                Their aging backup system couldn&apos;t restore reliably. Rebuilt on
                Dell PowerProtect DP4400 in two weeks.
              </p>
              <div className="cs-pills">
                <span className="cs-pill">100% data integrity</span>
                <span className="cs-pill">23:1 deduplication ratio</span>
              </div>
              <div className="cs-cta">
                <span className="link-text link-text-dark link-text-md link-text--external">
                  Read the case study
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
                      <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" />
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
                </span>
              </div>
            </Link>

            <div className="dci-cs-support-row">
              {CASE_STUDY_SUPPORTING.map((c) => (
                <Link href={c.url} className="cs-card" data-reveal="0" key={c.pillar}>
                  <p className="cs-eyebrow">{c.pillar}</p>
                  <p className="cs-stat">{c.statHeadline}</p>
                  <p className="cs-stat-caption">{c.statCaption}</p>
                  <p className="cs-outcome">{c.context}</p>
                  <div className="cs-pills">
                    <span className="cs-pill">{c.pills[0]}</span>
                    <span className="cs-pill">{c.pills[1]}</span>
                  </div>
                  <div className="cs-cta">
                    <span className="link-text link-text-dark link-text-md link-text--external">
                      Read the case study
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
                          <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" />
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
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="faq-layout">
            <div className="section-header-block">
              <p className="sec-eyebrow-l" data-reveal="0">
                FAQ
              </p>
              <h2 className="sec-heading-l" id="faq-heading" data-reveal="0">
                Questions people ask
              </h2>
            </div>

            <div className="faq-list" data-reveal="0">
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i;
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-button-${i}`;
                return (
                  <div className="faq-item" key={item.question}>
                    <h3 className="faq-question-wrap">
                      <button
                        type="button"
                        id={buttonId}
                        className="faq-question"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                      >
                        <span>{item.question}</span>
                        <span className={`faq-icon${isOpen ? " is-open" : ""}`}>
                          <PlusIcon />
                        </span>
                      </button>
                    </h3>
                    <div
                      className={`faq-answer${isOpen ? " is-open" : ""}`}
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                    >
                      <div className="faq-answer-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <PrimaryCTA
        heading="Ready to talk about your data center?"
        body="Tell us what you're working on, server, storage, network, virtualization, or backup, and we'll bring in the right person."
        buttonText="Talk to an expert"
        buttonLink="/contact"
        category="datacenter"
      />
    </div>
  );
}
