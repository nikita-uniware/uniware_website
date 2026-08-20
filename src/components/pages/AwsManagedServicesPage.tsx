"use client";

import { useState } from "react";
import {
  Pulse,
  Stack,
  ShieldCheck,
  ChartLineDown,
  ClockCounterClockwise,
  ArrowsOutSimple,
  GearSix,
  type Icon,
} from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { SplitCTA } from "@/components/SplitCTA";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/aws-migration.page.css";
import "@/styles/aws-managed-services.page.css";

type ServiceCard = {
  icon: Icon;
  heading: string;
  body: string;
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: Pulse,
    heading: "24/7 Monitoring & Support",
    body: "Real-time tracking of server health and performance, with issues caught and resolved before they affect your operations.",
  },
  {
    icon: Stack,
    heading: "Cloud Infrastructure Management",
    body: "Day-to-day handling of servers, load balancing, and resource management, keeping performance steady regardless of traffic.",
  },
  {
    icon: ShieldCheck,
    heading: "Security & Compliance",
    body: "Ongoing security configuration, encryption, and compliance management aligned to what your industry actually requires.",
  },
  {
    icon: ChartLineDown,
    heading: "Cost Optimization",
    body: "Continuous review of your AWS usage to eliminate waste, right-size resources, and reduce unnecessary spend.",
  },
  {
    icon: ClockCounterClockwise,
    heading: "Backup & Disaster Recovery",
    body: "Automated backups and a tested recovery plan, so a failure means minutes of disruption, not days.",
  },
  {
    icon: ArrowsOutSimple,
    heading: "Scaling & Auto-Provisioning",
    body: "Resources that adjust automatically to real demand, so you're never over-provisioned or caught short.",
  },
  {
    icon: GearSix,
    heading: "DevOps & Automation Support",
    body: "Automated deployment and provisioning tooling that reduces manual work and speeds up your release cycle.",
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
// with real Sanity content once available, same pattern as the Migration
// page's own case-study placeholders.
type CaseStudyPlaceholder = {
  eyebrow: string;
  stat: string;
  statCaption: string;
  body: string;
  pills: [string, string];
};

const CASE_STUDY_PLACEHOLDERS: CaseStudyPlaceholder[] = [
  {
    eyebrow: "AWS Managed Services",
    stat: "Placeholder",
    statCaption: "Details pending",
    body: "Draft: ongoing AWS management for a mid-market client, timeline and outcome to confirm.",
    pills: ["AWS", "Managed Services"],
  },
  {
    eyebrow: "Cost Optimization",
    stat: "Placeholder",
    statCaption: "Details pending",
    body: "Draft: AWS cost reduction engagement for an established client, timeline and outcome to confirm.",
    pills: ["AWS", "Cost Optimization"],
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What's included in your 24/7 monitoring?",
    answer:
      "Real-time tracking of server health, automated threat detection, performance benchmarking, and proactive issue resolution, all without disrupting your internal IT team.",
  },
  {
    question: "How does this actually reduce my AWS billing?",
    answer:
      "We review your compute usage, storage tiers, and network traffic to find waste. Right-sizing instances, using reserved capacity where it makes sense, and automating scaling all bring cost down without touching performance.",
  },
  {
    question: "Can you manage security and compliance for an enterprise environment?",
    answer:
      "Yes. Strict access controls, continuous vulnerability scanning, and encryption at rest, with your setup held to whatever regional or industry compliance standards actually apply to you.",
  },
  {
    question: "What's the difference between AWS Support and Uniware Managed Services?",
    answer:
      "AWS Support is Amazon's own tier-based support, it covers issues with AWS platform services themselves. Managed Services is the layer above that: someone who knows your specific environment, monitors it proactively, handles your configuration and patching, manages your costs, and responds when something goes wrong. Amazon's support answers questions about the platform. We're accountable for your environment running properly on it.",
  },
  {
    question: "What does onboarding look like when we sign up?",
    answer:
      "We start with an environment audit, mapping what's running and how it's configured. From there we set up monitoring tools with your access credentials, configure alerting thresholds, and establish a communication cadence. Most clients are fully onboarded within two to three weeks. We coordinate directly with your internal IT team throughout to make sure nothing disrupts your existing operations.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore. We have a presence in Delaware, US. Our London office opens in September 2026. We work with clients across India and the US, and remotely with businesses wherever they're based.",
  },
];

export function AwsManagedServicesPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="aws-managed-services-page">
      <section className="hero" aria-labelledby="aws-managed-services-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            AWS MANAGED SERVICES
          </p>
          <h1
            className="hero-headline"
            data-reveal="80"
            id="aws-managed-services-hero-heading"
          >
            Your AWS environment,
            <br />
            <span className="amber">run by people watching it every day.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            24/7 monitoring, security, cost control, and support for AWS
            environments already in production. Whether we migrated you or
            someone else did.
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
                src="/partners/aws-certified-security-specialty.png"
                alt="AWS Certified Security – Specialty"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">AWS Certified Security – Specialty</p>
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
                11 years keeping AWS environments running.
              </h2>
              <p className="stats-body">
                Since 2015, we&apos;ve supported AWS environments with
                monitoring, security, and cost management, not a one-time
                setup and a walk away, ongoing accountability for what&apos;s
                actually running in production.
              </p>
            </div>
            <div className="stats-right">
              <div className="stat-card" data-reveal="0">
                <div className="stat-number">4-hour</div>
                <div className="stat-label">Average incident response time</div>
              </div>
              <div className="stat-card" data-reveal="80">
                <div className="stat-number">11+</div>
                <div className="stat-label">Years offering AWS managed services</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="prevention svc-grid-section" aria-labelledby="managed-services-included-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">What&apos;s Included</p>
            <h2 className="sec-heading-l" id="managed-services-included-heading">
              What&apos;s included in ongoing support.
            </h2>
          </div>

          <div className="svc-grid" data-reveal="0">
            {SERVICE_CARDS.map(({ icon: CardIcon, heading, body }) => (
              <div className="tile-prev svc-tile" key={heading}>
                <div className="tile-icon-w" aria-hidden="true">
                  <span className="ti-stroke">
                    <CardIcon size={16} weight="regular" />
                  </span>
                  <span className="ti-fill">
                    <CardIcon size={16} weight="fill" />
                  </span>
                </div>
                <p className="tile-name-w">{heading}</p>
                <p className="tile-desc-w">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEV-ONLY PLACEHOLDER — no cloud-tagged case studies exist yet.
          Swap CASE_STUDY_PLACEHOLDERS above for real Sanity content once
          it's live, same as the Migration page's own placeholder case
          studies. */}
      <section id="case-studies" className="cs" aria-labelledby="aws-managed-services-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Case Studies</p>
              <h2 className="sec-heading-d" id="aws-managed-services-cs-heading">
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
                Questions people ask about ongoing support
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
          heading: "Done managing your AWS environment yourself?",
          body: "Tell us what you're running on AWS. We'll take monitoring, patching, and cost control off your plate.",
          buttonText: "Talk to an expert",
          buttonLink: "/contact",
        }}
        secondary={{
          eyebrow: "Not Migrated Yet",
          heading: "Start with Migration",
          body: "If you're not on AWS yet, that's a different conversation, planning the move itself.",
          buttonText: "See how migration works",
          buttonLink: "/solutions/cloud/aws/services/migration",
        }}
        primaryContact={{
          name: "Yogeshwaran",
          phone: "+91 73587 83739",
        }}
      />
    </div>
  );
}
