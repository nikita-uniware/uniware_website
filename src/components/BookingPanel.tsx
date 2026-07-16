"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/booking-panel.css";

/**
 * Global booking slide-in panel. Mounted once in root layout.
 * Open/close via window.openBookingPanel() / window.closeBookingPanel().
 */
export function BookingPanel() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.openBookingPanel = () => {
      setSent(false);
      setOpen(true);
    };
    window.closeBookingPanel = () => setOpen(false);

    return () => {
      window.openBookingPanel = () => {};
      window.closeBookingPanel = () => {};
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 310);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!sent) return;
    if (contentRef.current) contentRef.current.scrollTop = 0;
    successHeadingRef.current?.focus();
  }, [sent]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    try {
      const res = await fetch("/contact/book-call", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("submit failed");
      setSent(true);
    } catch {
      // Fall back to native POST if fetch fails
      form.submit();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div
        id="panel-overlay"
        className={`panel-overlay${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        id="booking-panel"
        className={`booking-panel bg-linear-90 from-uw-dark-blue to-uw-black${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Book a call with Uniware"
        aria-hidden={!open}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="panel-close"
          onClick={() => setOpen(false)}
          aria-label="Close panel"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="panel-content" ref={contentRef}>
          <div
            id="panel-success"
            className="panel-success"
            role="alert"
            aria-live="polite"
            style={{ display: sent ? "block" : "none" }}
          >
            <div className="panel-success-icon" aria-hidden="true">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2
              ref={successHeadingRef}
              className="panel-success-heading"
              tabIndex={-1}
            >
              You&rsquo;re booked in.
            </h2>
            <p className="panel-success-body">
              We&rsquo;ll call you within one business day.
            </p>
            <p className="panel-success-body">
              If it&rsquo;s urgent, contact Nirmal Kumar directly on{" "}
              <a href="tel:+919840861475">+91 98408 61475</a> or{" "}
              <a href="mailto:nirmal@uniware.net">nirmal@uniware.net</a>.
            </p>
          </div>

          <div
            id="panel-form-wrap"
            style={{ display: sent ? "none" : "block" }}
          >
            <p className="panel-eyebrow">Book a call</p>
            <h2 className="panel-heading">
              Let&rsquo;s talk about your environment.
            </h2>
            <p className="panel-sub">
              Fill in the form and we&rsquo;ll call you within one business day.
            </p>

            <form
              id="panel-form"
              action="/contact/book-call"
              method="POST"
              onSubmit={onSubmit}
            >
              <div className="panel-field-group">
                <div className="panel-field-item">
                  <label className="panel-field-label" htmlFor="pf-name">
                    Name
                  </label>
                  <input
                    className="panel-input"
                    type="text"
                    id="pf-name"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="panel-field-item">
                  <label className="panel-field-label" htmlFor="pf-email">
                    Email
                  </label>
                  <input
                    className="panel-input"
                    type="email"
                    id="pf-email"
                    name="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="panel-field-item">
                  <label className="panel-field-label" htmlFor="pf-company">
                    Company
                  </label>
                  <input
                    className="panel-input"
                    type="text"
                    id="pf-company"
                    name="company"
                    placeholder="Your company"
                    autoComplete="organization"
                  />
                </div>

                <div className="panel-field-item">
                  <label className="panel-field-label" htmlFor="pf-country">
                    Country
                  </label>
                  <div className="panel-select-wrap">
                    <select
                      className="panel-select"
                      id="pf-country"
                      name="country"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a country
                      </option>
                      <option value="IN">India</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="SG">Singapore</option>
                      <option value="US">United States</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="NL">Netherlands</option>
                      <option value="FR">France</option>
                      <option value="CA">Canada</option>
                      <option value="MY">Malaysia</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="panel-field-item">
                  <label className="panel-field-label" htmlFor="pf-topic">
                    What would you like to discuss
                  </label>
                  <div className="panel-select-wrap">
                    <select
                      className="panel-select"
                      id="pf-topic"
                      name="topic"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="backup">Backup and Recovery</option>
                      <option value="enquiry">General enquiry</option>
                    </select>
                  </div>
                </div>

                <div
                  className="panel-field-item"
                  role="group"
                  aria-labelledby="pf-time-legend"
                >
                  <p id="pf-time-legend" className="panel-field-label">
                    Preferred time{" "}
                    <span className="panel-field-optional">
                      (optional, select all that apply)
                    </span>
                  </p>
                  <div className="pills-track">
                    <input
                      type="checkbox"
                      id="pf-morning"
                      name="preferred_time[]"
                      value="morning"
                      className="pill-input"
                    />
                    <label htmlFor="pf-morning" className="pill-label">
                      Morning
                    </label>

                    <input
                      type="checkbox"
                      id="pf-afternoon"
                      name="preferred_time[]"
                      value="afternoon"
                      className="pill-input"
                    />
                    <label htmlFor="pf-afternoon" className="pill-label">
                      Afternoon
                    </label>

                    <input
                      type="checkbox"
                      id="pf-evening"
                      name="preferred_time[]"
                      value="evening"
                      className="pill-input"
                    />
                    <label htmlFor="pf-evening" className="pill-label">
                      Evening
                    </label>
                  </div>
                </div>

                <div className="panel-field-item">
                  <label className="panel-field-label" htmlFor="pf-notes">
                    Anything else{" "}
                    <span className="panel-field-optional">(optional)</span>
                  </label>
                  <textarea
                    className="panel-textarea"
                    id="pf-notes"
                    name="notes"
                    rows={3}
                    placeholder="Tell us a bit about your setup or what you’re trying to solve."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn-panel-submit"
                    disabled={submitting}
                  >
                    Book my call
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
      </aside>
    </>
  );
}
