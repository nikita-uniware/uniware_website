"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useScrollSyncHighlight } from "@/hooks/useScrollSyncHighlight";
import { CircleGroup } from "@/components/CircleGroup";
import { SplitCTA } from "@/components/SplitCTA";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/aws-migration.page.css";

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
// with real Sanity content once available, same pattern as the Cloud
// Infrastructure page's own case-study placeholders.
type CaseStudyPlaceholder = {
  eyebrow: string;
  stat: string;
  statCaption: string;
  body: string;
  pills: [string, string];
};

const CASE_STUDY_PLACEHOLDERS: CaseStudyPlaceholder[] = [
  {
    eyebrow: "AWS Migration",
    stat: "Placeholder",
    statCaption: "Details pending",
    body: "Draft: infrastructure migration for a mid-market services company, timeline and outcome to confirm.",
    pills: ["AWS", "Migration"],
  },
  {
    eyebrow: "Microsoft Workloads",
    stat: "Placeholder",
    statCaption: "Details pending",
    body: "Draft: Microsoft workload migration for an established client, timeline and outcome to confirm.",
    pills: ["Microsoft", "Workloads"],
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do you ensure minimal downtime during migration?",
    answer:
      "We use real-time data sync and pre-migration testing, then cut over during off-peak hours. Your team and customers shouldn't notice the move happened.",
  },
  {
    question: "What types of migrations do you handle?",
    answer:
      "Everything from simple lift-and-shift server moves to complex database migrations and full application deployment on AWS, including hybrid deployments for enterprise compliance needs.",
  },
  {
    question: "Is my data secure during the move?",
    answer:
      "Yes. End-to-end encryption, strict access controls, and hardened configurations apply throughout transit and deployment, not just once you're settled on AWS.",
  },
  {
    question: "Do you handle Microsoft-specific workload migrations?",
    answer:
      "Yes. We deploy and migrate .NET applications, IIS Server environments, SQL Server databases, SharePoint, Exchange, and Windows Server workloads to AWS, alongside the cost and performance benefits of moving off on-premises Microsoft infrastructure.",
  },
  {
    question: "How long does an AWS migration typically take?",
    answer:
      "Depends on scope. A simple workload migration, a few servers with no complex dependencies, can complete in days. A full enterprise environment, including discovery, planning, testing, and a phased cutover, typically runs four to twelve weeks. We scope every migration before committing to a timeline, since underscoping is the main reason migrations run late.",
  },
  {
    question: "How do you approach scoping and pricing for a migration?",
    answer:
      "We do a scoping assessment before quoting, since the cost depends on your current environment, number of workloads, complexity of dependencies, and how quickly you need to move. The assessment usually takes one to two sessions and gives us everything we need to quote accurately. Talk to us to get started.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore. We have a presence in Delaware, US. Our London office opens in September 2026. We work with clients across India and the US, and remotely with businesses wherever they're based.",
  },
];

export function AwsMigrationPage() {
  useReveal();
  useScrollSyncHighlight({
    triggerSelector: "[data-step-trigger].wts-card",
    triggerAttr: "step-trigger",
    activeClass: "is-current",
    requireIntersection: true,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="aws-migration-page">
      <section className="hero" aria-labelledby="aws-migration-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            AWS MIGRATION
          </p>
          <h1
            className="hero-headline"
            data-reveal="80"
            id="aws-migration-hero-heading"
          >
            Your AWS migration,
            <br />
            <span className="amber">handled by people who&apos;ve done it before.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            Minimal-downtime migration to AWS, planned and executed by certified
            engineers. For businesses that already know they&apos;re moving
            and need it done properly.
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
                src="/partners/aws-cloud-economics-essentials.png"
                alt="AWS Cloud Economics Essentials Partner"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">AWS Cloud Economics Essentials Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats stats--dark" aria-label="Who this is for">
        <div className="container">
          <div className="stats-grid">
            <div className="stats-left" data-reveal="0">
              <p className="stats-eyebrow">Track Record</p>
              <h2 className="stats-heading">
                11 years of moving businesses onto AWS.
              </h2>
              <p className="stats-body">
                Since 2015, we&apos;ve completed 50+ large-scale AWS
                migrations, from single-server moves to full enterprise
                environments.
              </p>
            </div>
            <div className="stats-right">
              <div className="stat-card" data-reveal="0">
                <div className="stat-number">50+</div>
                <div className="stat-label">Large-scale AWS migrations completed</div>
              </div>
              <div className="stat-card" data-reveal="80">
                <div className="stat-number">11+</div>
                <div className="stat-label">Years doing AWS migration work specifically</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="migration-process" className="wts" aria-labelledby="migration-process-heading">
        <div className="container">
          <div className="wts-layout">
            <div className="section-header-block mig-process-sticky">
              <p className="sec-eyebrow-l" data-reveal="0">
                How It Works
              </p>
              <h2 className="sec-heading-l" id="migration-process-heading" data-reveal="0">
                Four steps. No surprises.
              </h2>
              <p className="sec-sub-l" data-reveal="0">
                Every migration follows the same structure, adjusted to what
                you&apos;re actually moving.
              </p>
            </div>

            <div className="wts-cards">
              <div className="wts-card" data-step-trigger="1" data-reveal="0">
                <p className="wts-card-eyebrow">Step 1</p>
                <h3 className="wts-card-heading">Assessment &amp; Planning</h3>
                <p className="wts-card-body">
                  A thorough review of your current infrastructure,
                  applications, and workloads. This identifies real risks
                  early and sets goals that match your business, not a
                  generic checklist.
                </p>
              </div>

              <div className="wts-connector" aria-hidden="true" />

              <div className="wts-card" data-step-trigger="2" data-reveal="0">
                <p className="wts-card-eyebrow">Step 2</p>
                <h3 className="wts-card-heading">Strategy &amp; Design</h3>
                <p className="wts-card-body">
                  Based on that assessment, we build a roadmap specific to
                  what you&apos;re moving, whether that&apos;s a
                  straightforward lift-and-shift or a more complex database
                  migration.
                </p>
              </div>

              <div className="wts-connector" aria-hidden="true" />

              <div className="wts-card" data-step-trigger="3" data-reveal="0">
                <p className="wts-card-eyebrow">Step 3</p>
                <h3 className="wts-card-heading">Migration Execution</h3>
                <p className="wts-card-body">
                  Our team handles the move using proven AWS tools and
                  methodology, including specific experience with Microsoft
                  workloads. Minimal downtime, data integrity checked at
                  every step, configurations optimized to take full
                  advantage of AWS-native services along the way.
                </p>
              </div>

              <div className="wts-connector" aria-hidden="true" />

              <div className="wts-card" data-step-trigger="4" data-reveal="0">
                <p className="wts-card-eyebrow">Step 4</p>
                <h3 className="wts-card-heading">Optimization &amp; Monitoring</h3>
                <p className="wts-card-body">
                  We don&apos;t hand over the keys and leave. Ongoing tuning
                  and continuous monitoring catch issues early and keep your
                  environment cost-efficient after the move is done.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEV-ONLY PLACEHOLDER — no cloud-tagged case studies exist yet.
          Swap CASE_STUDY_PLACEHOLDERS above for real Sanity content once
          it's live, same as the Cloud Infrastructure page's own
          placeholder case studies. */}
      <section id="case-studies" className="cs" aria-labelledby="aws-migration-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Case Studies</p>
              <h2 className="sec-heading-d" id="aws-migration-cs-heading">
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

      <section id="faq" className="faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="faq-layout">
            <div className="section-header-block">
              <p className="sec-eyebrow-l" data-reveal="0">
                FAQ
              </p>
              <h2 className="sec-heading-l" id="faq-heading" data-reveal="0">
                Questions people ask before moving
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
          heading: "Ready to plan your migration?",
          body: "Tell us what you're running, or what you're trying to move. We'll bring in the right person.",
          buttonText: "Talk to an expert",
          buttonLink: "/contact",
        }}
        secondary={{
          eyebrow: "Already Migrated",
          heading: "See Managed Services",
          body: "If you're already running on AWS and need someone watching it day to day, monitoring, patching, cost control, that's a different conversation.",
          buttonText: "See Managed Services",
          buttonLink: "/solutions/cloud/aws/services/managed-services",
        }}
        primaryContact={{ name: "Yogeshwaran", phone: "+91 73587 83739" }}
      />
    </div>
  );
}
