"use client";

import { useState } from "react";
import { Compass, MapTrifold, ChartBar, SquaresFour, type Icon } from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { SplitCTA } from "@/components/SplitCTA";
import { IconTile } from "@/components/IconTile";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/aws-consulting.page.css";

type ServiceCard = {
  icon: Icon;
  heading: string;
  body: string;
};

// DRAFT — tiles 1-3 below need Dhana/Yogi confirmation before this page
// goes live. Best-guess content, not verified against real service scope
// (per AWS_Consulting_Page_Build.md, open item 1). Tile 4 is grounded in
// real old-site copy, not a guess — see its own comment below.
const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: Compass,
    heading: "Well-Architected Review",
    body: "A structured review of your AWS environment against AWS's own best practices, covering cost, security, performance, and reliability.",
  },
  {
    icon: MapTrifold,
    heading: "Cloud Strategy & Roadmap",
    body: "A clear plan for moving to AWS, or expanding what you already run there, built around your business timeline and budget.",
  },
  {
    icon: ChartBar,
    heading: "Cost Optimization Assessment",
    body: "An independent look at what you're spending on AWS and where that spend can come down without hurting performance.",
  },
  {
    // Grounded in real old-site copy, not a pure guess.
    icon: SquaresFour,
    heading: "Scalable Solutions Design",
    body: "Cloud architecture designed to grow with your business, not just for where you are today.",
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
    eyebrow: "Well-Architected Review",
    stat: "Placeholder",
    body: "Draft: architecture review engagement for a mid-market client, timeline and outcome to confirm.",
  },
  {
    eyebrow: "Cost Optimization",
    stat: "Placeholder",
    body: "Draft: AWS cost review engagement for an established client, timeline and outcome to confirm.",
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How is consulting different from Managed Services?",
    answer:
      "Consulting is a focused, time-boxed engagement, a review, a roadmap, an assessment. Managed Services is ongoing, day-to-day management once you're already running on AWS. Many clients start with consulting and move into Managed Services afterward.",
  },
  {
    question: "Do you offer AWS Well-Architected reviews specifically?",
    answer:
      "Yes. We review your environment against AWS's own Well-Architected Framework, covering cost, security, performance, and reliability.",
  },
  {
    question: "We're not on AWS yet, is consulting still useful?",
    answer:
      "Yes. A lot of our consulting work happens before migration, building the roadmap and business case first, so the move itself goes smoothly.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore as well. We opened in London, UK in August 2026, and we're now doing business here. We work with clients across India, the US, and the UK, and remotely with businesses wherever they're based.",
  },
];

export function AwsConsultingPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="aws-consulting-page">
      <section className="hero" aria-labelledby="aws-consulting-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            AWS CONSULTING
          </p>
          <h1 className="hero-headline" data-reveal="80" id="aws-consulting-hero-heading">
            AWS consulting,
            <br />
            <span className="amber">before you migrate or scale.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            For businesses evaluating AWS for the first time, or already
            running on it and wanting an outside review of architecture,
            cost, or security.
          </p>
          <span data-reveal="240">
            <a
              href="/contact"
              className="btn-size-lg btn-surface-dark"
              onClick={(e) => {
                e.preventDefault();
                window.openBookingPanel("aws");
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

      <section className="prevention svc-grid-section" aria-labelledby="aws-consulting-focus-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">Consulting</p>
            <h2 className="sec-heading-l" id="aws-consulting-focus-heading">
              AWS consulting, by focus area
            </h2>
            <p className="sec-sub-l">
              Four ways we help, depending on what you actually need
              reviewed or planned.
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
          live (per AWS_Consulting_Page_Build.md, open item 3). */}
      <section id="case-studies" className="cs" aria-labelledby="aws-consulting-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Case Studies</p>
              <h2 className="sec-heading-d" id="aws-consulting-cs-heading">
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
                Questions people ask about AWS consulting
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
        category="aws"
        primary={{
          eyebrow: "Get Started",
          heading: "Need a second opinion on your AWS setup?",
          body: "Tell us what you're running, or what you're planning. We'll bring the right person into the conversation.",
          buttonText: "Talk to an expert",
          buttonLink: "/contact",
        }}
        secondary={{
          eyebrow: "Ready to Move",
          heading: "Start with Migration",
          body: "If consulting confirms you're ready to move to AWS, migration is the next step.",
          buttonText: "See how migration works",
          buttonLink: "/solutions/cloud/aws/services/migration/",
        }}
        primaryContact={{
          name: "Yogeshwaran",
          phone: "+91 73587 83739",
        }}
      />
    </div>
  );
}
