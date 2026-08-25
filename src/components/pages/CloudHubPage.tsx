"use client";

import { useState } from "react";
import { Stack, ShareNetwork, Gauge, ShieldCheck, Cloud } from "@phosphor-icons/react";
import { useReveal } from "@/hooks/useReveal";
import { CircleGroup } from "@/components/CircleGroup";
import { DirectoryTile } from "@/components/DirectoryTile";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/cloud-hub.page.css";

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

const DIRECTORY_CARDS = [
  {
    icon: Stack,
    heading: "Infrastructure",
    body: "Private, public, and hybrid cloud infrastructure, designed to fit how your business actually runs.",
    href: "/solutions/cloud/infrastructure/",
    linkText: "Explore Infrastructure",
  },
  {
    icon: ShareNetwork,
    heading: "Networking",
    body: "VPN, Direct Connect, and SD-WAN, so your business connects to the cloud securely and reliably.",
    href: "/solutions/cloud/networking/",
    linkText: "Explore Networking",
  },
  {
    // DRAFT — no old-site content, no page built yet, needs review with
    // Dhana (per Cloud_Hub_Page_Build.md, open item 1).
    icon: Gauge,
    heading: "Operations",
    body: "Ongoing monitoring, performance tuning, and day-to-day management for cloud environments already in production.",
    href: "/solutions/cloud/operations/",
    linkText: "Explore Operations",
  },
  {
    // DRAFT — no page built yet, needs review with Dhana on relationship
    // to the Cybersecurity page (per Cloud_Hub_Page_Build.md, open item 1).
    icon: ShieldCheck,
    heading: "Security",
    body: "Security built into your cloud environment, not bolted on afterward.",
    href: "/solutions/cloud/security/",
    linkText: "Explore Security",
  },
  {
    // DEV PLACEHOLDER — no literal AWS logo exists in Phosphor's icon set;
    // Cloud is the closest brand-neutral equivalent, pending Niki's
    // confirmation (per Cloud_Hub_Page_Build.md, open item 3).
    icon: Cloud,
    heading: "AWS",
    body: "Migration, managed services, consulting, and specific AWS products, all under one AWS Advanced Tier Partner.",
    href: "/solutions/cloud/aws/",
    linkText: "Explore AWS",
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
    eyebrow: "Cloud Infrastructure",
    stat: "Placeholder",
    body: "Draft: cloud infrastructure engagement for a mid-market client, timeline and outcome to confirm.",
  },
  {
    eyebrow: "AWS",
    stat: "Placeholder",
    body: "Draft: AWS engagement for an established client, timeline and outcome to confirm.",
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Which cloud service is right for us?",
    answer:
      "It depends on where you are. If you need infrastructure design, start there. If you're already running on AWS and need it managed, Managed Services is the fit. If security is the priority, that's its own conversation. We'll help you figure out the right starting point.",
  },
  {
    question: "Are you an AWS partner?",
    answer: "Yes, Uniware is an AWS Advanced Tier Partner.",
  },
  {
    question: "Do you support hybrid and multi-cloud environments?",
    answer:
      "We design and manage private, public, and hybrid cloud infrastructure. Our AWS work is currently AWS-specific, we don't yet support multi-cloud connectivity across other providers.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore as well. We opened in London, UK in August 2026, and we're now doing business here. We work with clients across India, the US, and the UK, and remotely with businesses wherever they're based.",
  },
];

export function CloudHubPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="cloud-hub-page">
      <section className="hero" aria-labelledby="cloud-hub-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            CLOUD SERVICES
          </p>
          <h1 className="hero-headline" data-reveal="80" id="cloud-hub-hero-heading">
            Cloud services and infrastructure,
            <br />
            <span className="amber">built for how you work.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            Infrastructure, networking, security, and AWS expertise for
            mid-market and enterprise businesses across India and the US.
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
                src="/partners/dell-platinum-partner.png"
                alt="Dell Technologies Platinum Partner"
                className="h-16 w-auto"
              />
              <div className="dci-badge-text">
                <p className="dci-badge-label">Certified</p>
                <p className="dci-badge-tier text-[#0076CE]">Dell Technologies Platinum Partner</p>
              </div>
            </div>

            <div className="dci-badge">
              <img
                src="/partners/commvault-premier-solutions-partner.png"
                alt="Commvault Premier Solutions Partner"
                className="h-16 w-auto"
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
                Over 200 companies have trusted us with their cloud.
              </h2>
              <p className="stats-body">
                Thirty years in IT infrastructure, now applied to cloud,
                on-prem, and everything in between. We&apos;ve supported
                businesses across India and the US with infrastructure,
                networking, security, and AWS work.
              </p>
            </div>
            <div className="stats-right">
              <div className="stat-card" data-reveal="0">
                <div className="stat-number">200+</div>
                <div className="stat-label">Companies trusted us</div>
              </div>
              <div className="stat-card" data-reveal="80">
                <div className="stat-number">30 years</div>
                <div className="stat-label">In IT infrastructure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="prevention svc-grid-section" aria-labelledby="cloud-hub-directory-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">Cloud Services</p>
            <h2 className="sec-heading-l" id="cloud-hub-directory-heading">
              Cloud services, by area
            </h2>
            <p className="sec-sub-l">
              Five ways we help, depending on what your business needs right
              now.
            </p>
          </div>

          <div className="svc-grid" data-reveal="0">
            {DIRECTORY_CARDS.map((card) => (
              <DirectoryTile key={card.heading} variant="light" {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* DEV-ONLY PLACEHOLDER — no cloud-tagged case studies exist yet.
          Swap CASE_STUDY_PLACEHOLDERS above for real content once it's
          live (per Cloud_Hub_Page_Build.md, open item 2). */}
      <section id="case-studies" className="cs" aria-labelledby="cloud-hub-cs-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Case Studies</p>
              <h2 className="sec-heading-d" id="cloud-hub-cs-heading">
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
                Questions people ask about cloud
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

      {/* Contact person NEEDS CONFIRMATION per Cloud_Hub_Page_Build.md —
          Yogeshwaran is used elsewhere on AWS pages, used here as the
          confirmed contact for this hub-level page. */}
      <PrimaryCTA
        heading="Not sure which cloud service fits?"
        body="Tell us what you're working on. We'll point you to the right part of our cloud practice."
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
