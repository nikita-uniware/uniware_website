"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import "@/styles/contact.page.css";

type ContactPageProps = {
  initialSent?: boolean;
};

const OFFICES = [
  {
    city: "Chennai, India",
    hq: true,
    addressLines: [
      "1178D, 58th Street, TVS Colony, Anna Nagar West Extension,",
      "Chennai, Tamil Nadu 600101, India",
    ],
    contactName: "Nirmal",
    phoneDisplay: "+91 98408 61475",
    phoneHref: "tel:+919840861475",
  },
  {
    city: "Kerala, India",
    hq: false,
    addressLines: [
      "No. 13/412-A, First Floor, Pandoth Road,",
      "Maradu, Ernakulam 682304, India",
    ],
    contactName: "Anish",
    phoneDisplay: "+91 86060 18212",
    phoneHref: "tel:+918606018212",
  },
  {
    city: "Hyderabad, India",
    hq: false,
    addressLines: [
      "8th Floor, SLN Terminus, Survey No. 133,",
      "Beside Botanical Gardens, Gachibowli,",
      "Hyderabad, Telangana 500032, India",
    ],
    contactName: "Vijay",
    phoneDisplay: "+91 73580 35443",
    phoneHref: "tel:+917358035443",
  },
  {
    city: "Bangalore, India",
    hq: false,
    addressLines: [
      "RBI Gautham Housing Society, 2, Kothnur Dinne Main Rd,",
      "Nrupathunga Nagar, JP Nagar 7th Phase,",
      "Bengaluru, Karnataka 560078, India",
    ],
    contactName: "Ilakkiya",
    phoneDisplay: "+91 73388 49085",
    phoneHref: "tel:+917338849085",
  },
  {
    city: "London, UK",
    hq: false,
    addressLines: ["20 Wenlock Road", "London N1 7GU"],
    contactName: "Nikita",
    phoneDisplay: "+44 79563 65550",
    phoneHref: "tel:+447956365550",
  },
  {
    city: "Delaware, USA",
    hq: false,
    addressLines: ["8 The Green, Suite A", "Dover, DE 19901-3618"],
    contactName: "Nikita",
    phoneDisplay: "+44 79563 65550",
    phoneHref: "tel:+447956365550",
  },
] as const;

const ABOUT_OPTIONS = [
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "cloud", label: "Cloud" },
  { value: "aws", label: "AWS" },
  { value: "data-centre-infrastructure", label: "Data Centre Infrastructure" },
  { value: "ai-solutions", label: "AI Solutions" },
  { value: "backup", label: "Backup and Recovery" },
  { value: "enquiry", label: "General enquiry" },
  { value: "partnership", label: "Partnership" },
] as const;

type AboutValue = (typeof ABOUT_OPTIONS)[number]["value"];

/**
 * Contact page — port of contact-and-panel HTML (panel lives in root layout).
 */
export function ContactPage({ initialSent = false }: ContactPageProps) {
  const [sent, setSent] = useState(initialSent);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAbout, setSelectedAbout] = useState<AboutValue[]>([]);
  const [aboutError, setAboutError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useReveal({ heroSelector: ".contact-intro" });

  useEffect(() => {
    if (initialSent) setSent(true);
  }, [initialSent]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedAbout.length === 0) {
      setAboutError("Select at least one topic.");
      return;
    }

    const form = e.currentTarget;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/contact", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("submit failed");
      setSent(true);
      document
        .getElementById("contact-success")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch {
      setSubmitError(
        "Something went wrong. Please try again, or email sales@uniware.net.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="main-content" className="contact-page">
      <section
        className="contact-intro bg-linear-90 from-uw-dark-blue to-uw-black"
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <p className="contact-eyebrow" data-reveal="0">
            Contact
          </p>
          <h1 className="contact-h1" data-reveal="80" id="contact-heading">
            Talk to our team.
          </h1>
          <p className="contact-subtext" data-reveal="160">
            We work with businesses across India, the US, and the UK. Send us a
            message below, or email us directly at{" "}
            <a href="mailto:sales@uniware.net">sales@uniware.net</a>. You could
            even give us a call, we&rsquo;re happy to talk.
          </p>
        </div>
      </section>

      <section
        className="contact-body"
        aria-label="Office locations and contact form"
      >
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="contact-form-box" data-reveal="0">
                <h2 className="contact-form-heading">Send us a message</h2>

                <div
                  id="contact-success"
                  className="contact-success"
                  role="alert"
                  aria-live="polite"
                  style={{ display: sent ? "block" : "none" }}
                >
                  <div className="contact-success-icon" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="contact-success-heading">Message sent.</p>
                  <p className="contact-success-body">
                    Thanks for reaching out. We&rsquo;ll get back to you within
                    1 business day. For urgent inquiries, call us directly at{" "}
                    <a href="tel:+919840861475">+91 98408 61475</a>.
                  </p>
                </div>

                <div
                  id="contact-form-area"
                  style={{ display: sent ? "none" : "block" }}
                >
                  <form
                    id="contact-form"
                    action="/contact"
                    method="POST"
                    onSubmit={onSubmit}
                  >
                    <div className="field-group">
                      <div className="field-row">
                        <div className="field-item">
                          <label className="field-label" htmlFor="cf-name">
                            Name
                          </label>
                          <input
                            className="field-input"
                            type="text"
                            id="cf-name"
                            name="name"
                            placeholder="Your name"
                            autoComplete="name"
                            required
                          />
                        </div>
                        <div className="field-item">
                          <label className="field-label" htmlFor="cf-email">
                            Email
                          </label>
                          <input
                            className="field-input"
                            type="email"
                            id="cf-email"
                            name="email"
                            placeholder="you@company.com"
                            autoComplete="email"
                            required
                          />
                        </div>
                      </div>

                      <div className="field-item">
                        <label className="field-label" htmlFor="cf-company">
                          Company
                        </label>
                        <input
                          className="field-input"
                          type="text"
                          id="cf-company"
                          name="company"
                          placeholder="Your company"
                          autoComplete="organization"
                        />
                      </div>

                      <div
                        className="field-item"
                        role="group"
                        aria-labelledby="cf-about-legend"
                        aria-describedby={aboutError ? "cf-about-error" : undefined}
                      >
                        <p id="cf-about-legend" className="field-label">
                          What&rsquo;s this about{" "}
                          <span className="field-optional">
                            (select all that apply)
                          </span>
                        </p>
                        <div className="contact-pills-track">
                          {ABOUT_OPTIONS.map((option) => {
                            const id = `cf-about-${option.value}`;
                            return (
                              <span key={option.value}>
                                <input
                                  type="checkbox"
                                  id={id}
                                  name="about[]"
                                  value={option.value}
                                  className="contact-pill-input"
                                  checked={selectedAbout.includes(option.value)}
                                  onChange={(event) => {
                                    setSelectedAbout((current) =>
                                      event.target.checked
                                        ? [...current, option.value]
                                        : current.filter(
                                            (item) => item !== option.value,
                                          ),
                                    );
                                    setAboutError("");
                                  }}
                                />
                                <label htmlFor={id} className="contact-pill-label">
                                  {option.label}
                                </label>
                              </span>
                            );
                          })}
                        </div>
                        {aboutError && (
                          <p
                            id="cf-about-error"
                            className="field-error"
                            role="alert"
                          >
                            {aboutError}
                          </p>
                        )}
                      </div>

                      <div className="field-item">
                        <label className="field-label" htmlFor="cf-message">
                          Message
                        </label>
                        <textarea
                          className="field-textarea"
                          id="cf-message"
                          name="message"
                          placeholder="Tell us what you need..."
                          rows={6}
                          required
                        />
                      </div>

                      <div>
                        {submitError && (
                          <p className="field-error" role="alert">
                            {submitError}
                          </p>
                        )}
                        <button
                          type="submit"
                          className="btn-size-lg btn-surface-light btn-submit-l-layout"
                          disabled={submitting}
                        >
                          Send message
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div>
              <p className="loc-eyebrow" data-reveal="0">
                Our offices
              </p>
              <div className="loc-list" data-reveal="80">
                {OFFICES.map((office) => (
                  <div className="loc-item" key={office.city}>
                    <div className="loc-city-row">
                      <p className="loc-city">{office.city}</p>
                      {office.hq ? (
                        <span className="loc-hq-badge">Headquarters</span>
                      ) : null}
                    </div>
                    <p className="loc-address">
                      {office.addressLines.map((line, i) => (
                        <span key={line}>
                          {i > 0 ? <br /> : null}
                          {line}
                        </span>
                      ))}
                    </p>
                    <p className="loc-person">
                      <span className="loc-person-name">{office.contactName}</span>
                      <span className="loc-person-sep" aria-hidden="true">
                        {" "}
                        |{" "}
                      </span>
                      <a href={office.phoneHref} className="loc-phone">
                        {office.phoneDisplay}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
