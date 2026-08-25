"use client";

import { useState } from "react";
import { Cloud, Cube, MagnifyingGlass, type Icon } from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { SplitCTA } from "@/components/SplitCTA";
import { IconTile } from "@/components/IconTile";
import "@/styles/cybersecurity.page.css";
import "@/styles/cloud-security.page.css";

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

type CoverCard = {
  icon: Icon;
  heading: string;
  body: string;
  pills: string[];
};

const COVER_CARDS: CoverCard[] = [
  {
    icon: Cloud,
    heading: "Cloud Security Posture Management",
    body: "Continuous compliance scanning across AWS, Azure, and Microsoft 365. Configuration drift caught and corrected before it becomes a real exposure.",
    pills: ["CrowdStrike CSPM"],
  },
  {
    icon: Cube,
    heading: "Workload & Container Protection",
    body: "Runtime protection for containers, Kubernetes, and serverless functions, infrastructure that doesn't exist in a traditional network and needs its own defenses.",
    pills: ["SentinelOne", "Trend Micro"],
  },
  {
    icon: MagnifyingGlass,
    heading: "Cloud Compliance & Visibility",
    body: "Clear, ongoing visibility into what's actually running across your cloud environment, and whether it meets the compliance standards that apply to you.",
    pills: ["Tenable"],
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What's the difference between this and your Cybersecurity page?",
    answer:
      "Cybersecurity covers the full picture, network, endpoints, email, identity, and how you recover if something gets through. This page goes deeper on the cloud-specific pieces: continuous configuration scanning and workload protection for containers and serverless.",
  },
  {
    question: "What is Cloud Security Posture Management (CSPM)?",
    answer:
      "CSPM continuously scans your cloud environment for misconfigurations, an exposed storage bucket, an overly broad access policy, and flags them before they become a real security gap.",
  },
  {
    question: "Do you support Kubernetes and container security?",
    answer:
      "Yes. We deploy runtime protection for containers, Kubernetes clusters, and serverless functions, workloads that don't exist in a traditional network and need their own defenses.",
  },
  {
    question: "Do we need this in addition to your Cybersecurity services, or instead of them?",
    answer:
      "In addition. This page is a deeper look at the cloud-specific parts of a strategy that's covered fully on our Cybersecurity page.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore as well. We opened in London, UK in August 2026, and we're now doing business here. We work with clients across India, the US, and the UK, and remotely with businesses wherever they're based.",
  },
];

export function CloudSecurityPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="cloud-security-page">
      <section className="hero" aria-labelledby="cloud-security-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            CLOUD SECURITY
          </p>
          <h1 className="hero-headline" data-reveal="80" id="cloud-security-hero-heading">
            Cloud security,
            <br />
            <span className="amber">covered as part of your full strategy.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            For businesses running workloads on AWS, Azure, or Microsoft
            365, needing continuous cloud configuration monitoring and
            protection for containers, Kubernetes, and serverless
            workloads.
          </p>
          <span data-reveal="240">
            <a
              href="/contact"
              className="btn-size-lg btn-surface-dark"
              onClick={(e) => {
                e.preventDefault();
                window.openBookingPanel("cloud", "cloud-security");
              }}
            >
              Talk to an expert
              <ArrowIcon />
            </a>
          </span>
        </div>
        <CircleGroup size="xl" surface="dark" position="bottom-right" enterAnimation />
      </section>

      <section className="prevention" aria-labelledby="cloud-security-cover-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">Cloud Security</p>
            <h2 className="sec-heading-l" id="cloud-security-cover-heading">
              What we cover here
            </h2>
            <p className="sec-sub-l">
              Beyond configuration scanning, the security concerns that
              only exist because your workloads run in the cloud.
            </p>
          </div>

          <div className="cover-grid" data-reveal="0">
            {COVER_CARDS.map(({ icon: CardIcon, heading, body, pills }) => (
              <div className="tile-prev" key={heading}>
                <IconTile icon={CardIcon} />
                <p className="tile-name-w">{heading}</p>
                <p className="tile-desc-w">{body}</p>
                <div className="tile-connector">
                  <div className="tc-line-w" />
                </div>
                <div className="tile-pills">
                  {pills.map((pill) => (
                    <span className="pill-w" key={pill}>
                      {pill}
                    </span>
                  ))}
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
                Questions people ask about cloud security
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
        primaryPreselectedTopic="cloud-security"
        primary={{
          eyebrow: "Get Started",
          heading: "Running workloads in the cloud?",
          body: "Tell us what you're running, and where. We'll cover the configuration and workload protection pieces specifically.",
          buttonText: "Talk to an expert",
          buttonLink: "/contact",
        }}
        secondary={{
          eyebrow: "See The Full Picture",
          heading: "Our Cybersecurity Approach",
          body: "Cloud security is just one piece. For network, endpoints, email, identity, prevention, and recovery, all covered end to end, see our complete approach.",
          buttonText: "See our approach",
          buttonLink: "/solutions/cybersecurity/",
        }}
      />
    </div>
  );
}
