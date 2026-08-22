"use client";

import { useState } from "react";
import { Sparkle, FileText, Plugs, type Icon } from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/aws-genai.page.css";

type ServiceCard = {
  icon: Icon;
  heading: string;
  body: string;
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: Sparkle,
    heading: "Custom AI Applications on Bedrock",
    body: "From chatbots and content moderation to synthetic data generation and predictive maintenance, we build generative AI applications around real business problems, not generic demos.",
  },
  {
    icon: FileText,
    heading: "Document Processing & Automation",
    body: "AI-powered extraction and processing for invoices, purchase orders, contracts, and other high-volume business documents. Read more about our own document processing platform at uniware.ai.",
  },
  {
    icon: Plugs,
    heading: "AI Integration & Deployment",
    body: "Connecting generative AI into your existing systems and workflows, deployed securely on AWS.",
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

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Amazon Bedrock?",
    answer:
      "Amazon Bedrock is AWS's managed service for building generative AI applications, giving access to multiple foundation models through a single platform, with AWS's security and infrastructure behind it.",
  },
  {
    question: "Is this just a chatbot?",
    answer:
      "No. We build applications around specific business problems, like document processing or workflow automation, not generic conversational assistants.",
  },
  {
    question: "Do you have a live example of this working?",
    answer:
      "Yes. We've built and deployed our own AI-powered document processing platform on Bedrock, live with a manufacturing client in India. See the case study above.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore. We have a presence in Delaware, US. Our London office opens in September 2026. We work with clients across India and the US, and remotely with businesses wherever they're based.",
  },
];

export function AwsGenAiPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="aws-genai-page">
      <section className="hero" aria-labelledby="aws-genai-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            AWS GENERATIVE AI
          </p>
          <h1 className="hero-headline" data-reveal="80" id="aws-genai-hero-heading">
            Generative AI on AWS,
            <br />
            <span className="amber">built around your business.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            For businesses that want to use generative AI for a real,
            specific problem, not a generic chatbot. Built on Amazon
            Bedrock, customized to how you actually work.
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
                src="/partners/aws-partner-generative-ai-technical.png"
                alt="AWS Generative AI Technical (Trained Partner)"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">
                  AWS Generative AI Technical (Trained Partner)
                </p>
              </div>
            </div>

            <div className="dci-badge">
              <img
                src="/partners/aws-partner-accreditation-business.png"
                alt="AWS Generative AI Business (Accredited)"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#232F3E]">
                  AWS Generative AI Business (Accredited)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="prevention svc-grid-section" aria-labelledby="aws-genai-build-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">AWS Generative AI</p>
            <h2 className="sec-heading-l" id="aws-genai-build-heading">
              What we build with Bedrock
            </h2>
            <p className="sec-sub-l">
              Three ways we help, depending on what you&apos;re trying to
              solve.
            </p>
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

      <section id="case-studies" className="cs" aria-labelledby="aws-genai-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Case Studies</p>
              <h2 className="sec-heading-d" id="aws-genai-cs-heading">
                Proof it works
              </h2>
            </div>
          </div>

          <div data-reveal="0">
            <div className="cs-card">
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

              <div className="dci-pillar-grid">
                <div>
                  <p className="cs-eyebrow">Document Processing</p>
                  <p className="cs-stat">From 10 minutes to under a minute</p>
                  <p className="cs-stat-caption">
                    First production batch: 53 invoices, zero failures
                  </p>
                  <p className="cs-body">
                    A global manufacturer of construction equipment in India
                    was processing around 100 invoices a day by hand,
                    feeding the data manually into SAP. We built an
                    AI-powered document processing platform on Amazon
                    Bedrock to handle it instead.
                  </p>
                  <a
                    href="https://uniware.ai/case-studies/global-manufacturer-india-invoice-processing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-text link-text-dark link-text-md link-text--external"
                  >
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
                  </a>
                </div>

                <div>
                  <p className="cs-body">
                    &ldquo;That&apos;s when it hit me. Our data was
                    scattered across the network, a lot of it duplicated,
                    and every day we had around 100 invoices coming in with
                    people doing pure data entry to feed that into
                    SAP.&rdquo;
                  </p>
                  <p className="cs-stat-caption">
                    Head of IT Infrastructure &amp; Cybersecurity, a leading
                    global manufacturer of construction equipment
                  </p>
                </div>
              </div>
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
                Questions people ask about AWS generative AI
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
        heading="Curious what generative AI could do for your business?"
        body="Tell us the problem you're trying to solve. We'll tell you honestly whether generative AI is the right tool for it."
        buttonText="Talk to an expert"
        buttonLink="/contact"
        category="cloud"
        contactLine={{
          name: "Yogeshwaran",
          phone: "+91 73587 83739",
        }}
      />
    </div>
  );
}
