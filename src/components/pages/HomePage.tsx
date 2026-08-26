"use client";

import { useEffect, useState } from "react";
import { Buildings } from "@phosphor-icons/react";
import MuxPlayer from "@mux/mux-player-react";
import { useReveal } from "@/hooks/useReveal";
import { useScrollSyncHighlight } from "@/hooks/useScrollSyncHighlight";
import { CircleGroup } from "@/components/CircleGroup";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import type { CustomerLogo } from "@/lib/sanity";
import "@/styles/data-centre-infrastructure.page.css";
import "@/styles/cybersecurity.page.css";
import "@/styles/home.page.css";

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

// Placeholder count when Sanity has no Customers tagged for homepage yet.
const CLIENT_LOGO_PLACEHOLDER_COUNT = 8;

function ClientLogoRow({
  direction,
  customers,
}: {
  direction: "ltr" | "rtl";
  customers: CustomerLogo[];
}) {
  // ×4 repeat, same seamless-loop convention buildPartnerStripHtml
  // already uses for the tech-partner marquee (1 primary set + 3
  // aria-hidden copies against the -25% scroll transform).
  const source =
    customers.length > 0
      ? customers
      : Array.from({ length: CLIENT_LOGO_PLACEHOLDER_COUNT }, (_, i) => ({
          name: `Client ${i + 1}`,
          slug: `placeholder-${i}`,
          logoUrl: "",
        }));
  const items = Array.from({ length: source.length * 4 }, (_, i) => source[i % source.length]);

  return (
    <div className="pf-marquee-track">
      <div className={`pf-marquee-row pf-marquee-row--${direction}`}>
        {items.map((customer, i) => (
          <div className="pf-logo-item" aria-hidden="true" key={`${direction}-${customer.slug}-${i}`}>
            {customer.logoUrl ? (
              <img src={customer.logoUrl} alt="" loading="lazy" />
            ) : (
              <Buildings size={24} weight="regular" className="our-clients-logo-placeholder" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

type StoryItem = {
  year: string;
  heading: string;
  body: string;
  linkText: string;
  href: string;
};

const STORY_ITEMS: StoryItem[] = [
  {
    year: "1995",
    heading: "Data Centre Infrastructure",
    body: "Servers, storage, and networks. The foundation everything else sits on.",
    linkText: "Explore Data Centre Infrastructure",
    href: "/solutions/data-centre-infrastructure/",
  },
  {
    year: "2015",
    heading: "Cloud",
    body: "Infrastructure got expensive to own. Clients wanted to move. We moved with them.",
    linkText: "Explore Cloud",
    href: "/solutions/cloud/",
  },
  {
    year: "2018",
    heading: "Cybersecurity",
    body: "Once everything critical lived in that infrastructure, protecting it became its own discipline.",
    linkText: "Explore Cybersecurity",
    href: "/solutions/cybersecurity/",
  },
  {
    year: "2025",
    heading: "AI Solutions",
    body: "Now the same clients are asking how to move into AI safely. We're already inside their infrastructure.",
    linkText: "Explore AI Solutions",
    href: "/solutions/cloud/aws/workloads/genai/",
  },
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Where do you operate?",
    answer:
      "We're headquartered in Chennai, India, with offices in Kerala, Hyderabad, and Bangalore as well. We opened in London, UK in August 2026, and we're now doing business here. We work with clients across India, the US, and the UK, and remotely with businesses wherever they're based.",
  },
  {
    question: "What size businesses do you work with?",
    answer:
      "We work primarily with small and mid-sized businesses (SMB), and we grow with them into enterprise. Many of our clients started with small teams and have since scaled to hundreds of employees and multiple locations. We've supported that whole journey, from getting the first infrastructure in place to managing complex, multi-site operations. If there's a genuine fit, size isn't what stops the conversation.",
  },
  {
    question: "How is Uniware different from a typical IT vendor or reseller?",
    answer:
      "We don't just supply technology. We help you choose the right technology, implement it correctly, and support it through your growth.\n\nMost vendors lead with a product. We start by understanding your environment and where you're headed, then recommend from a shortlist we've already validated. Not everything on the market, just what we know is stable, properly supported by the vendor, and right for your situation long-term.\n\nOur team also stays. Long tenures mean the person who helped design your infrastructure is often still the one answering your call years later. Most of our new business comes through referrals from those relationships, which is the clearest signal we have that the approach is working.",
  },
];

export function HomePage({ customers = [] }: { customers?: CustomerLogo[] }) {
  useReveal();
  useScrollSyncHighlight({
    triggerSelector: "[data-step-trigger].wts-card",
    triggerAttr: "step-trigger",
    activeClass: "is-current",
    requireIntersection: true,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentStory, setCurrentStory] = useState<number | null>(null);

  // Recognition carousel arrows. Not using useCyberPageBehaviors here —
  // that hook also wires up subnav tabs, crossbars, and a marquee clone
  // this page doesn't have (and already clones its own marquee rows in
  // ClientLogoRow), so a local handler avoids duplicating unrelated
  // behaviour. Card width is read directly off .rec-card rather than
  // the shared hook's .tile-prev/.tile-rec selector, since these cards
  // are a bespoke layout, not a tile.
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      '.arrow-btn[data-carousel-target="recognition-track"]'
    );
    const handlers: Array<{ btn: HTMLButtonElement; handler: () => void }> = [];
    buttons.forEach((btn) => {
      const handler = () => {
        const track = document.getElementById("recognition-track");
        if (!track) return;
        const dir = parseInt(btn.getAttribute("data-dir") || "1", 10);
        const card = track.querySelector<HTMLElement>(".rec-card");
        track.scrollBy({
          left: dir * (card ? card.offsetWidth + 10 : 480),
          behavior: "smooth",
        });
      };
      btn.addEventListener("click", handler);
      handlers.push({ btn, handler });
    });
    return () => {
      handlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
    };
  }, []);

  // Mirrors useScrollSyncHighlight's own computed .is-current state
  // (rather than re-deriving scroll position independently) so the
  // connector fill and the card highlight can never disagree.
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-step-trigger].wts-card")
    );
    if (cards.length === 0) return;

    function sync() {
      const active = cards.find((el) => el.classList.contains("is-current"));
      setCurrentStory(active ? Number(active.getAttribute("data-step-trigger")) : null);
    }

    const observer = new MutationObserver(sync);
    cards.forEach((el) =>
      observer.observe(el, { attributes: true, attributeFilter: ["class"] })
    );
    sync();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="home-hero-heading">
        <div className="container">
          <p className="hero-eyebrow" data-reveal="0">
            FROM INFRASTRUCTURE TO AI
          </p>
          <h1 className="hero-headline" data-reveal="80" id="home-hero-heading">
            30 years of IT infrastructure.
            <br />
            <span className="amber">Now cloud, cybersecurity, and AI.</span>
          </h1>
          <p className="hero-subtext" data-reveal="160">
            We manage your IT, so you can manage your business.
          </p>

          <div className="hero-stats" data-reveal="320">
            <div className="stat-card">
              <div className="stat-number">30+</div>
              <div className="stat-label">years building IT infrastructure</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">companies served</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">offices across India, the US, and the UK</div>
            </div>
          </div>
        </div>
        <CircleGroup
          size="xl"
          surface="dark"
          position="bottom-right"
          enterAnimation
          style={{ zIndex: 0 }}
        />
      </section>

      <section className="dci-badges" aria-label="Certified partner accreditations">
        <div className="container">
          <div className="dci-badges-row">
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

      <section className="recovery" aria-labelledby="home-story-heading">
        <div className="container">
          <div data-reveal="0">
            <div className="section-header-block">
              <p className="sec-eyebrow-d">Our Story</p>
              <h2 className="sec-heading-d" id="home-story-heading">
                We didn&apos;t start here. We grew into it.
              </h2>
            </div>
          </div>

          <div className="wts-cards">
            {STORY_ITEMS.map((item, i) => (
              <div key={item.year}>
                <div
                  className="wts-card"
                  data-step-trigger={String(i + 1)}
                  data-reveal="0"
                >
                  <p className="wts-card-eyebrow">{item.year}</p>
                  <h3 className="wts-card-heading">{item.heading}</h3>
                  <p className="wts-card-body">{item.body}</p>
                  <a
                    href={item.href}
                    className="link-text link-text-dark link-text-md wts-card-link"
                  >
                    {item.linkText}
                    <ArrowIcon />
                  </a>
                </div>
                {i < STORY_ITEMS.length - 1 && (
                  <div
                    className={`wts-connector${
                      currentStory !== null && currentStory > i + 1 ? " is-filled" : ""
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="our-clients" aria-labelledby="home-clients-heading">
        <div className="container">
          <div className="section-header-block" data-reveal="0">
            <p className="sec-eyebrow-l">Our Clients</p>
            <h2 className="sec-heading-l" id="home-clients-heading">
              500+ companies. Some with us for over 25 years.
            </h2>
          </div>
        </div>

        {/* Customers from Sanity (pages includes "homepage"). Falls back
            to placeholder glyphs until logos are uploaded in Studio. */}
        <div className="pf-marquee-col our-clients-marquee" data-reveal="0">
          <ClientLogoRow direction="ltr" customers={customers} />
          <ClientLogoRow direction="rtl" customers={customers} />
        </div>
      </section>

      <section className="recovery" aria-labelledby="home-recognition-heading">
        <div className="container">
          <div className="sec-header-flex">
            <div data-reveal="0">
              <p className="sec-eyebrow-d">Recognition</p>
              <h2 className="sec-heading-d" id="home-recognition-heading">
                Recognized where it counts
              </h2>
            </div>
            <div className="sec-arrows" role="group" aria-label="Scroll recognition cards">
              <button
                type="button"
                className="arrow-btn arrow-btn-d"
                data-carousel-target="recognition-track"
                data-dir="-1"
                aria-label="Previous"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M11.5 7H2.5M2.5 7L6 3.5M2.5 7L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="arrow-btn arrow-btn-d"
                data-carousel-target="recognition-track"
                data-dir="1"
                aria-label="Next"
              >
                <ArrowIcon />
              </button>
            </div>
          </div>

          <div className="carousel-wrap carousel-wrap-d" data-reveal="0">
            <div className="carousel-track" id="recognition-track">
              {/* Card 1 — Recognized by Dell */}
              <div className="rec-card">
                <div className="rec-card-left">
                  <p className="rec-card-kicker">Recognized by</p>
                  <img
                    src="/logos/dell-logo-white.svg"
                    alt="Dell Technologies"
                    className="rec-card-logo"
                  />
                  <p className="rec-card-desc">
                    Dell wrote a case study about how we solved a backup and
                    storage challenge for one of their largest customers in
                    India.
                  </p>
                </div>
                <div className="rec-card-right">
                  <MuxPlayer
                    className="cs-media-video"
                    playbackId="X02OOGL4K6hkTPvE8iM6Dh6eIgUTsf9iGVDM3LfUV024M"
                    streamType="on-demand"
                    accentColor="#D4832F"
                  />
                  <div className="rec-stats-grid">
                    <div className="rec-stat">
                      <p className="rec-stat-number">85%</p>
                      <p className="rec-stat-label">Reduction in backup window</p>
                    </div>
                    <div className="rec-stat">
                      <p className="rec-stat-number">100%</p>
                      <p className="rec-stat-label">Data integrity achieved</p>
                    </div>
                    <div className="rec-stat">
                      <p className="rec-stat-number">23:1</p>
                      <p className="rec-stat-label">Deduplication ratio</p>
                    </div>
                    <div className="rec-stat">
                      <p className="rec-stat-number">90%</p>
                      <p className="rec-stat-label">Improvement in restore window</p>
                    </div>
                  </div>
                  <a
                    href="https://global.uniware.net/resources/case-studies/schwing-stetter-dell-data-protection-backup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-text link-text-dark link-text-md link-text--external rec-card-link"
                  >
                    Read our case study
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              {/* Card 2 — Recognized by Commvault */}
              <div className="rec-card">
                <div className="rec-card-left">
                  <p className="rec-card-kicker">Recognized by</p>
                  <img
                    src="/logos/commvault-logo-white.svg"
                    alt="Commvault"
                    className="rec-card-logo"
                  />
                  <p className="rec-card-desc">
                    Three of our team were recognized at Commvault&apos;s 2026
                    Partner Bootcamp for their work building this partnership.
                  </p>
                </div>
                <div className="rec-card-right">
                  <p className="rec-award-label">Award recipients</p>
                  <div className="rec-award-list">
                    <div className="rec-award-row">
                      <img
                        src="/team/karthikeyan-commvault.png"
                        alt="Karthikeyan S"
                        className="rec-award-photo"
                      />
                      <div className="rec-award-info">
                        <p className="rec-award-name">Karthikeyan S</p>
                        <p className="rec-award-role">Senior Technical Manager</p>
                      </div>
                      <span className="rec-award-badge">Strategic Partner Award</span>
                    </div>
                    <div className="rec-award-row">
                      <img
                        src="/team/divya-commvault.png"
                        alt="Divya Karunakaran"
                        className="rec-award-photo"
                      />
                      <div className="rec-award-info">
                        <p className="rec-award-name">Divya Karunakaran</p>
                        <p className="rec-award-role">Strategic Accounts Manager</p>
                      </div>
                      <span className="rec-award-badge">Value Creation Award</span>
                    </div>
                    <div className="rec-award-row">
                      <img
                        src="/team/porselvan-commvault.png"
                        alt="Porselvan N"
                        className="rec-award-photo"
                      />
                      <div className="rec-award-info">
                        <p className="rec-award-name">Porselvan N</p>
                        <p className="rec-award-role">Enterprise Accounts Manager</p>
                      </div>
                      <span className="rec-award-badge">Sales MVP Award</span>
                    </div>
                  </div>
                  <div className="rec-award-footer">
                    <p className="rec-award-footer-desc">
                      We were also the systems integrator behind a
                      Commvault case study for IP Rings.
                    </p>
                    <a
                      href="https://www.commvault.com/resources/case-studies/ip-rings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-text link-text-dark link-text-md link-text--external"
                    >
                      Read this case study
                      <ArrowIcon />
                    </a>
                  </div>
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
                Questions people ask
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
                        {item.answer.split("\n\n").map((paragraph, pi) => (
                          <p key={pi}>{paragraph}</p>
                        ))}
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
        heading="Ready to talk?"
        body="Tell us what you're working on, whether it's infrastructure, cloud, cybersecurity, or AI. We'll bring in the right person and help you manage it, so you can manage your business."
        buttonText="Talk to an expert"
        buttonLink="/contact"
        category="cybersecurity"
      />
    </div>
  );
}
