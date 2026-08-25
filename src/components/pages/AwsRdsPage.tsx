"use client";

import { useState } from "react";
import { Database, Gauge, ClockCounterClockwise, type Icon } from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { SplitCTA } from "@/components/SplitCTA";
import { IconTile } from "@/components/IconTile";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/aws-rds.page.css";

type ServiceCard = {
  icon: Icon;
  heading: string;
  body: string;
};

// DRAFT — all 3 tiles below need Dhana/Yogi confirmation before this page
// goes live. Best-guess content, not verified against real service scope
// (per AWS_RDS_Page_Build.md, open item 1).
const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: Database,
    heading: "RDS Setup & Migration",
    body: "Getting your database onto RDS correctly the first time, or moving an existing database over without losing data or uptime.",
  },
  {
    icon: Gauge,
    heading: "Performance & Availability Tuning",
    body: "Configuring Multi-AZ failover and tuning your instance so it stays fast and available under real load.",
  },
  {
    icon: ClockCounterClockwise,
    heading: "Backup & Cost Management",
    body: "Automated backup strategy and right-sizing your instance so you're not paying for capacity you don't need.",
  },
];

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

// DEV-ONLY PLACEHOLDER — no cloud-tagged case studies exist yet. Replace
// with real content once the case studies are live.
type CaseStudyPlaceholder = {
  eyebrow: string;
  stat: string;
  body: string;
};

const CASE_STUDY_PLACEHOLDERS: CaseStudyPlaceholder[] = [
  {
    eyebrow: "RDS Migration",
    stat: "Placeholder",
    body: "Draft: RDS setup and migration engagement for a mid-market client, timeline and outcome to confirm.",
  },
  {
    eyebrow: "Performance Tuning",
    stat: "Placeholder",
    body: "Draft: RDS performance and cost optimization engagement for an established client, timeline and outcome to confirm.",
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What database engines do you support on RDS?",
    answer:
      "RDS supports MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server. We work across all of them, depending on what your application already runs on.",
  },
  {
    question: "What's the difference between RDS and running our own database server?",
    answer:
      "RDS handles backups, patching, and failover automatically. Running your own server means your team is responsible for all of that manually. RDS trades some control for a lot less operational overhead.",
  },
  {
    question: "Can you help us migrate an existing database to RDS?",
    answer:
      "Yes. We handle the migration itself, checking data integrity and minimizing downtime during the move.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore as well. We opened in London, UK in August 2026, and we're now doing business here. We work with clients across India, the US, and the UK, and remotely with businesses wherever they're based.",
  },
];

export function AwsRdsPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="aws-rds-page">
      <section className="hero" aria-labelledby="aws-rds-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            AWS RDS
          </p>
          <h1 className="hero-headline" data-reveal="80" id="aws-rds-hero-heading">
            AWS RDS,
            <br />
            <span className="amber">implemented by AWS-certified engineers.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            For businesses running critical databases on AWS RDS, or
            planning to move them there, needing setup, tuning, or
            day-to-day management from certified engineers.
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
                src="/partners/aws-solutions-architect-professional.png"
                alt="AWS Certified Solutions Architect – Professional"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">Solutions Architect Professional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="prevention svc-grid-section" aria-labelledby="aws-rds-handle-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">RDS Services</p>
            <h2 className="sec-heading-l" id="aws-rds-handle-heading">
              What we handle on RDS
            </h2>
            <p className="sec-sub-l">
              Three ways we help, whether you&apos;re setting up RDS for the
              first time or already running it.
            </p>
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
          live (per AWS_RDS_Page_Build.md, open item 3). */}
      <section id="case-studies" className="cs" aria-labelledby="aws-rds-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Case Studies</p>
              <h2 className="sec-heading-d" id="aws-rds-cs-heading">
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
                Questions people ask about AWS RDS
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
          heading: "Need help with your RDS environment?",
          body: "Tell us what you're running, or what you're planning to move. We'll take it from there.",
          buttonText: "Talk to an expert",
          buttonLink: "/contact",
        }}
        secondary={{
          eyebrow: "Need A Broader Review",
          heading: "See AWS Consulting",
          body: "If RDS is just one part of a bigger AWS question, our consulting team can help with the whole picture.",
          buttonText: "Explore Consulting",
          buttonLink: "/solutions/cloud/aws/services/consulting/",
        }}
        primaryContact={{
          name: "Yogeshwaran",
          phone: "+91 73587 83739",
        }}
      />
    </div>
  );
}
