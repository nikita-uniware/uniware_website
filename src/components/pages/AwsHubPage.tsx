"use client";

import { useState } from "react";
import { PaperPlaneTilt, Pulse, Compass } from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { DirectoryTile } from "@/components/DirectoryTile";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/aws-hub.page.css";

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

const SERVICE_CARDS = [
  {
    icon: PaperPlaneTilt,
    heading: "Migration",
    body: "Minimal-downtime migration to AWS, planned and executed by certified engineers.",
    href: "/solutions/cloud/aws/services/migration/",
    linkText: "Explore Migration",
  },
  {
    icon: Pulse,
    heading: "Managed Services",
    body: "24/7 monitoring, security, cost control, and support for AWS environments already in production.",
    href: "/solutions/cloud/aws/services/managed-services/",
    linkText: "Explore Managed Services",
  },
  {
    // DRAFT — needs review once Consulting page content is finalized
    // (per AWS_Hub_Page_Build.md, open item 3).
    icon: Compass,
    heading: "Consulting",
    body: "AWS architecture and strategy guidance from certified consultants.",
    href: "/solutions/cloud/aws/services/consulting/",
    linkText: "Explore Consulting",
  },
];

const WORKLOAD_CARDS = [
  {
    heading: "Amazon RDS",
    body: "Amazon RDS database setup, tuning, and ongoing management, so your data layer stays fast and reliable.",
    href: "/solutions/cloud/aws/workloads/rds/",
    linkText: "Explore RDS",
  },
  {
    // DRAFT — needs review, pending scope decision on relationship to the
    // UniDocs AI page (per AWS_Hub_Page_Build.md, open item 4).
    heading: "Generative AI (Amazon Bedrock)",
    body: "Custom AI and document automation built on Amazon Bedrock, tailored to your business.",
    href: "/solutions/cloud/aws/workloads/genai/",
    linkText: "Explore Amazon Bedrock",
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Which AWS service is right for us?",
    answer:
      "It depends on where you are. If you're not on AWS yet, start with Migration. If you're already running on AWS, Managed Services keeps it running well. If you need architecture or strategy help first, Consulting is the right starting point.",
  },
  {
    question: "Do you only work with specific AWS products, or general AWS support too?",
    answer:
      "Both. We offer broad services like migration and managed services, and we also work hands-on with specific AWS products like RDS and Bedrock when that's what your business needs.",
  },
  {
    question: "Are you an official AWS partner?",
    answer: "Yes, Uniware is an AWS Advanced Tier Partner.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore. We have a presence in Delaware, US. Our London office opens in September 2026. We work with clients across India and the US, and remotely with businesses wherever they're based.",
  },
];

export function AwsHubPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="aws-hub-page">
      <section className="hero" aria-labelledby="aws-hub-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            AWS PARTNER
          </p>
          <h1 className="hero-headline" data-reveal="80" id="aws-hub-hero-heading">
            Everything you need on AWS,
            <br />
            <span className="amber">backed by people who know it well.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            From migration to managed services to the specific AWS products
            your business runs on, we&apos;re an Advanced Tier Partner across
            India and the US.
          </p>
          <span data-reveal="240">
            <a
              href="/contact"
              className="btn-size-lg btn-surface-dark"
              onClick={(e) => {
                e.preventDefault();
                window.openBookingPanel();
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

      <section className="stats stats--dark" aria-label="Track record">
        <div className="container">
          <div className="stats-grid">
            <div className="stats-left" data-reveal="0">
              <p className="stats-eyebrow">Track Record</p>
              <h2 className="stats-heading">11+ years of AWS partnership.</h2>
              <p className="stats-body">
                We&apos;ve been an AWS partner since 2015, holding Advanced
                Tier status since 2016, delivering cloud deployments,
                migrations, and managed services to businesses across India
                and the US.
              </p>
            </div>
            <div className="stats-right">
              <div className="stat-card" data-reveal="0">
                <div className="stat-number">11+</div>
                <div className="stat-label">Years as an AWS Advanced Tier Partner</div>
              </div>
              <div className="stat-card" data-reveal="80">
                <div className="stat-number">250+</div>
                <div className="stat-label">Cloud deployments delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="prevention svc-grid-section" aria-labelledby="aws-hub-services-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">Services</p>
            <h2 className="sec-heading-l" id="aws-hub-services-heading">
              How we work with you
            </h2>
            <p className="sec-sub-l">
              Three ways to engage us, depending on where you are with AWS.
            </p>
          </div>

          <div className="svc-grid" data-reveal="0">
            {SERVICE_CARDS.map((card) => (
              <DirectoryTile key={card.heading} variant="light" {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="recovery svc-grid-section" aria-labelledby="aws-hub-workloads-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-d">Workloads</p>
            <h2 className="sec-heading-d" id="aws-hub-workloads-heading">
              What you&apos;re running on AWS
            </h2>
            <p className="sec-sub-d">
              Specific AWS products we design, deploy, and manage.
            </p>
          </div>

          <div className="svc-grid svc-grid--2col" data-reveal="0">
            {WORKLOAD_CARDS.map((card) => (
              <DirectoryTile key={card.heading} variant="dark" {...card} />
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
                Questions people ask about working with an AWS partner
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

      {/* Contact person is NEEDS CONFIRMATION per AWS_Hub_Page_Build.md
          (open item 6) — Yogeshwaran is used elsewhere on AWS pages, used
          here as a placeholder until confirmed right for a hub-level page. */}
      <PrimaryCTA
        heading="Not sure where to start?"
        body="Tell us what you're running on AWS. We'll point you to the right service."
        buttonText="Talk to an expert"
        buttonLink="/contact"
        contactLine={{
          name: "Yogeshwaran",
          phone: "+91 73587 83739",
        }}
      />
    </div>
  );
}
