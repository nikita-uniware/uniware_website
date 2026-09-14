"use client";

import { useState } from "react";
import {
  Cube,
  PlugsConnected,
  TreeStructure,
  type Icon,
} from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { IconTile } from "@/components/IconTile";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/cloud-networking.page.css";

type PathCard = {
  icon: Icon;
  heading: string;
  body: string;
};

const PATH_CARDS: PathCard[] = [
  {
    icon: Cube,
    heading: "VPC Design & Architecture",
    body: "Your Virtual Private Cloud is the foundation everything else sits on. We design it to be secure, scalable, and easy to manage as you grow.",
  },
  {
    icon: PlugsConnected,
    heading: "Hybrid Connectivity",
    body: "Connect your office or data center to AWS through a VPN tunnel or a dedicated Direct Connect line, whichever fits your traffic volume and budget. AWS-only at this time.",
  },
  {
    icon: TreeStructure,
    heading: "SD-WAN & Multi-Site Networking",
    body: "Running more than one location? We deploy and manage SD-WAN using Fortinet and Versa Networks, routing traffic intelligently across offices, warehouses, and your AWS connection.",
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
    question: "What's the difference between a VPN and Direct Connect?",
    answer:
      "A VPN is an encrypted tunnel that runs over the public internet. Direct Connect is a dedicated physical line straight to AWS, bypassing the internet entirely. VPN is faster to set up and lower cost. Direct Connect is more reliable and predictable for high-volume or latency-sensitive traffic.",
  },
  {
    question: "Do you support SD-WAN across multiple offices?",
    answer:
      "Yes. We deploy and manage SD-WAN using Fortinet and Versa Networks, routing traffic intelligently across your office locations, warehouses, and cloud connections.",
  },
  {
    question:
      "Can you connect our AWS environment directly to our office network?",
    answer:
      "Yes. We design and set up both VPN and Direct Connect depending on your traffic volume, budget, and latency needs.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore as well. We opened in London, UK in August 2026, and we're now doing business here. We work with clients across India, the US, and the UK, and remotely with businesses wherever they're based.",
  },
];

export function CloudNetworkingPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="cloud-networking-page">
      <section className="hero" aria-labelledby="cloud-networking-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            CLOUD NETWORKING
          </p>
          <h1
            className="hero-headline"
            data-reveal="80"
            id="cloud-networking-hero-heading"
          >
            Your path to the cloud,
            <br />
            <span className="amber">built the right way.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            VPN, Direct Connect, and SD-WAN, planned and managed so your
            connection to AWS stays fast, secure, and reliable. 80+
            connections set up since 2015, across India and the US.
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

      <section className="prevention svc-grid-section" aria-labelledby="cloud-networking-paths-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">The Options</p>
            <h2 className="sec-heading-l" id="cloud-networking-paths-heading">
              Three ways to connect
            </h2>
            <p className="sec-sub-l">
              Every business connects to the cloud differently. We design the
              right mix for yours.
            </p>
          </div>

          <div className="svc-grid" data-reveal="0">
            {PATH_CARDS.map(({ icon: CardIcon, heading, body }) => (
              <div className="tile-prev svc-tile" key={heading}>
                <IconTile icon={CardIcon} />
                <p className="tile-name-w">{heading}</p>
                <p className="tile-desc-w">{body}</p>
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
                Questions people ask before connecting
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
        heading="Ready to plan your connection to the cloud?"
        body="Tell us how your business connects today. We'll design the right mix of VPN, Direct Connect, and SD-WAN for you."
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
