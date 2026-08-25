"use client";

import { useState } from "react";
import { Gauge, Pulse, ShieldCheck, Timer, type Icon } from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { SplitCTA } from "@/components/SplitCTA";
import { IconTile } from "@/components/IconTile";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/cloud-operations.page.css";

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

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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

type BestPractice = {
  title: string;
  body: string;
};

const BEST_PRACTICES: BestPractice[] = [
  {
    title: "Set up a deployment plan",
    body: "Develop a structured deployment plan tailored to your cloud architecture, network, and business needs, so applications roll out without disruptions.",
  },
  {
    title: "Automate cloud processes",
    body: "Identify repetitive tasks like backups and scans, then automate them so your team can focus on higher-value work.",
  },
  {
    title: "Build and maintain redundancy",
    body: "Duplicate critical components across a multilayered system, so a single failure doesn't take down the service.",
  },
  {
    title: "Set appropriate resource limits",
    body: "Track demand during peak and off-peak periods, so resources are provisioned correctly, not over- or under-provisioned.",
  },
  {
    title: "Evaluate multi-cloud or hybrid-cloud fit regularly",
    body: "Combine multiple providers, or mix on-premises and cloud, for more flexibility and less vendor lock-in.",
  },
  {
    title: "Implement cloud governance and security policies",
    body: "Enforce policies that keep cloud usage aligned with your organization's goals and compliance requirements.",
  },
  {
    title: "Implement robust disaster recovery plans",
    body: "Set clear failover strategies and regular backups, so downtime stays minimal if something goes wrong.",
  },
  {
    title: "Monitor cloud costs",
    body: "Regularly review spend to catch overprovisioning and unused resources before they become a problem.",
  },
];

const BEST_PRACTICES_COL_1 = BEST_PRACTICES.slice(0, 4);
const BEST_PRACTICES_COL_2 = BEST_PRACTICES.slice(4);

type ServiceCard = {
  icon: Icon;
  heading: string;
  body: string;
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: Gauge,
    heading: "Improve Service Delivery",
    body: "Automating report generation, quality checks, and provisioning improves IT productivity and operational efficiency.",
  },
  {
    icon: Pulse,
    heading: "Maintain Cloud Availability",
    body: "Real-time scaling, monitoring, and automation keep your cloud services running, wherever they're hosted.",
  },
  {
    icon: ShieldCheck,
    heading: "Strengthen Data Security",
    body: "Encryption, malware scanning, firewalls, and compliance management, to prevent breaches and meet legal standards.",
  },
  {
    icon: Timer,
    heading: "Facilitate Disaster Recovery",
    body: "Automated backups and recovery tools restore lost data and systems, so business continuity isn't at risk.",
  },
];

// DEV-ONLY PLACEHOLDER — no cloud-tagged case studies exist yet. Replace
// with real content once the case studies are live.
type CaseStudyPlaceholder = {
  eyebrow: string;
  stat: string;
  body: string;
};

const CASE_STUDY_PLACEHOLDERS: CaseStudyPlaceholder[] = [
  {
    eyebrow: "Cloud Operations",
    stat: "Placeholder",
    body: "Draft: multi-cloud operations engagement for a mid-market client, timeline and outcome to confirm.",
  },
  {
    eyebrow: "Disaster Recovery",
    stat: "Placeholder",
    body: "Draft: disaster recovery planning engagement for an established client, timeline and outcome to confirm.",
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What's the difference between Cloud Operations and Managed Services?",
    answer:
      "Managed Services is specifically for AWS environments. Cloud Operations covers multi-cloud and hybrid setups too, wherever your workloads actually run.",
  },
  {
    question: "Do you support multi-cloud environments?",
    answer:
      "Yes. We manage operations across AWS, Azure, on-premises, or a mix, depending on your setup.",
  },
  {
    question: "What happens if something goes down?",
    answer:
      "We build disaster recovery and failover plans in advance, so downtime stays minimal and recovery is fast when something does go wrong.",
  },
  {
    question: "How do you handle governance and compliance across multiple clouds?",
    answer:
      "We enforce cloud governance and security policies that keep usage aligned with your organization's goals, wherever those workloads are running.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore as well. We opened in London, UK in August 2026, and we're now doing business here. We work with clients across India, the US, and the UK, and remotely with businesses wherever they're based.",
  },
];

export function CloudOperationsPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="cloud-operations-page">
      <section className="hero" aria-labelledby="cloud-ops-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            CLOUD OPERATIONS
          </p>
          <h1 className="hero-headline" data-reveal="80" id="cloud-ops-hero-heading">
            Cloud operations,
            <br />
            <span className="amber">managed across every environment you run.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            For businesses running workloads across AWS, Azure, on-premises,
            or a mix of all three, needing deployment, automation,
            governance, and disaster recovery handled properly.
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
              <ArrowIcon />
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
                src="/partners/aws-well-architected-proficient.png"
                alt="AWS Well-Architected Proficient"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">Well-Architected Proficient</p>
              </div>
            </div>

            <div className="dci-badge">
              <img
                src="/partners/dell-platinum-partner.png"
                alt="Dell Technologies Platinum Partner"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#0076CE]">Dell Technologies Platinum Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recovery" aria-labelledby="cloud-ops-practices-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Best Practices</p>
              <h2 className="sec-heading-d" id="cloud-ops-practices-heading">
                Cloud operation best practices
              </h2>
              <p className="sec-sub-d">
                The habits that keep a cloud environment reliable, secure,
                and cost-efficient over time.
              </p>
            </div>
          </div>

          <div className="best-practices-grid" data-reveal="0">
            <ul className="cs-results">
              {BEST_PRACTICES_COL_1.map((p) => (
                <li key={p.title}>
                  <CheckIcon />
                  <span>
                    <span className="cs-results-title">{p.title}</span> —{" "}
                    {p.body}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="cs-results">
              {BEST_PRACTICES_COL_2.map((p) => (
                <li key={p.title}>
                  <CheckIcon />
                  <span>
                    <span className="cs-results-title">{p.title}</span> —{" "}
                    {p.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="prevention svc-grid-section" aria-labelledby="cloud-ops-benefits-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">Benefits</p>
            <h2 className="sec-heading-l" id="cloud-ops-benefits-heading">
              What optimized cloud operations gets you
            </h2>
          </div>

          <div className="svc-grid" data-reveal="0">
            {SERVICE_CARDS.map(({ icon: CardIcon, heading, body }) => (
              <div className="tile-prev svc-tile" key={heading}>
                <IconTile icon={CardIcon} />
                <p className="tile-name-w">{heading}</p>
                <p className="tile-desc-w">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEV-ONLY PLACEHOLDER — no cloud-tagged case studies exist yet.
          Swap CASE_STUDY_PLACEHOLDERS above for real content once it's
          live (per Cloud_Operations_Page_Build.md, open item 2). */}
      <section id="case-studies" className="cs" aria-labelledby="cloud-ops-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Case Studies</p>
              <h2 className="sec-heading-d" id="cloud-ops-cs-heading">
                Placeholder — replace once cloud case studies are live
              </h2>
            </div>
          </div>

          <div className="dci-cs-grid">
            <div className="dci-cs-support-row">
              {CASE_STUDY_PLACEHOLDERS.map((c) => (
                <div className="cs-card" data-reveal="0" key={c.eyebrow}>
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
                  <p className="cs-body">{c.body}</p>
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
                Questions people ask about cloud operations
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

      <SplitCTA
        id="get-started"
        category="cloud"
        primary={{
          eyebrow: "Get Started",
          heading: "Need your cloud environment properly managed?",
          body: "Tell us what you're running, and where. We'll take deployment, automation, and monitoring off your plate.",
          buttonText: "Talk to an expert",
          buttonLink: "/contact",
        }}
        secondary={{
          eyebrow: "Already On AWS",
          heading: "See Managed Services",
          body: "If you're fully on AWS, our Managed Services page covers day-to-day AWS operations specifically.",
          buttonText: "Explore Managed Services",
          buttonLink: "/solutions/cloud/aws/services/managed-services/",
        }}
        primaryContact={{
          name: "Yogeshwaran",
          phone: "+91 73587 83739",
        }}
      />
    </div>
  );
}
