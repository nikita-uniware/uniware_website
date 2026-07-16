"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import "@/styles/contact.page.css";

type ContactPageProps = {
  initialSent?: boolean;
};

/**
 * Contact page — port of contact-and-panel HTML (panel lives in root layout).
 */
export function ContactPage({ initialSent = false }: ContactPageProps) {
  const [sent, setSent] = useState(initialSent);
  const [submitting, setSubmitting] = useState(false);

  useReveal({ heroSelector: ".contact-intro" });

  useEffect(() => {
    if (initialSent) setSent(true);
  }, [initialSent]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
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
      form.submit();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="main-content" className="contact-page">
      <section className="contact-intro" aria-labelledby="contact-heading">
        <div className="container">
          <p className="contact-eyebrow" data-reveal="0">
            Contact
          </p>
          <h1 className="contact-h1" data-reveal="80" id="contact-heading">
            Talk to our team.
          </h1>
          <p className="contact-subtext" data-reveal="160">
            We work with businesses across India, the US, and the UK. Write to us
            below, or give us a call directly. We&rsquo;re happy to talk.
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
                    We&rsquo;ll be in touch within one business day. If
                    you&rsquo;d prefer to reach us directly, write to us at{" "}
                    <a href="mailto:info@uniware.net">info@uniware.net</a>.
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

                      <div className="field-item">
                        <label className="field-label" htmlFor="cf-about">
                          What&rsquo;s this about
                        </label>
                        <div className="field-select-wrap">
                          <select
                            className="field-select"
                            id="cf-about"
                            name="about"
                            required
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select a topic
                            </option>
                            <option value="cybersecurity">Cybersecurity</option>
                            <option value="backup">Backup and Recovery</option>
                            <option value="enquiry">General enquiry</option>
                            <option value="partnership">Partnership</option>
                          </select>
                        </div>
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
                        <button
                          type="submit"
                          className="btn-submit-l"
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
                <div className="loc-item">
                  <div className="loc-city-row">
                    <p className="loc-city">Chennai, India</p>
                    <span className="loc-hq-badge">Headquarters</span>
                  </div>
                  <p className="loc-address">
                    14 Rajiv Gandhi Salai, Perungudi
                    <br />
                    Chennai, Tamil Nadu 600096
                  </p>
                  <a href="tel:+914445678901" className="loc-phone">
                    +91 44 4567 8901
                  </a>
                </div>

                <div className="loc-item">
                  <div className="loc-city-row">
                    <p className="loc-city">Kerala, India</p>
                  </div>
                  <p className="loc-address">
                    3rd Floor, Aster Centre, MG Road
                    <br />
                    Kochi, Kerala 682016
                  </p>
                  <a href="tel:+914842345678" className="loc-phone">
                    +91 484 234 5678
                  </a>
                </div>

                <div className="loc-item">
                  <div className="loc-city-row">
                    <p className="loc-city">Hyderabad, India</p>
                  </div>
                  <p className="loc-address">
                    Plot 15, Cyberspace Building, HITEC City
                    <br />
                    Hyderabad, Telangana 500081
                  </p>
                  <a href="tel:+914067890123" className="loc-phone">
                    +91 40 6789 0123
                  </a>
                </div>

                <div className="loc-item">
                  <div className="loc-city-row">
                    <p className="loc-city">Delaware, USA</p>
                  </div>
                  <p className="loc-address">
                    251 Little Falls Drive, Suite 4
                    <br />
                    Wilmington, Delaware 19808
                  </p>
                  <a href="tel:+13025550147" className="loc-phone">
                    +1 302 555 0147
                  </a>
                </div>

                <div className="loc-item">
                  <div className="loc-city-row">
                    <p className="loc-city">London</p>
                  </div>
                  <p className="loc-soon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6.5"
                        stroke="#BB6D08"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M8 5v3.5L10 10"
                        stroke="#BB6D08"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Opening soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
