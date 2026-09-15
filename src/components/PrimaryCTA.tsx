import { CircleGroup } from "@/components/CircleGroup";

/**
 * Single-zone amber CTA: one continuous section, no secondary zone.
 * Layout, proportions, min-height, heading font-size tokens, and the
 * CircleGroup decoration (top-right, lg, surface="light") are fixed
 * by .dci-cta/.dci-cta-row/.dci-cta-heading/.dci-cta-sub in
 * data-centre-infrastructure.page.css — pages only supply content
 * and a link.
 *
 * ── CTA click convention (PrimaryCTA + SplitCTA + inline heroes) ──
 * - Navigate to a page (e.g. homepage → /contact): buttonAction="navigate"
 *   or any buttonLink that is not handled as a panel open.
 * - Open the booking side panel: buttonAction="booking-panel" (or the
 *   default when buttonLink is "/contact" on solution pages) and pass
 *   category. Prefer an explicit openBookingPanel() call on raw <a>/<button>
 *   so intent is obvious in the markup.
 * Never attach openBookingPanel to a link that should leave the page.
 */
type PrimaryCTAContact = {
  name: string;
  /** Display format, e.g. "+91 98408 61475". The tel: href is derived
   * by stripping whitespace — pass the number as it should read, not
   * as it should link. */
  phone: string;
};

type PrimaryCTAProps = {
  eyebrow?: string;
  heading: string;
  body: string;
  buttonText: string;
  buttonLink: string;
  /**
   * How the button behaves:
   * - "navigate" — follow buttonLink (use on homepage / marketing CTAs
   *   that should land on the contact page).
   * - "booking-panel" — open the side panel (solution-page CTAs).
   * Default: "booking-panel" when buttonLink is "/contact", otherwise
   * "navigate". Pass "navigate" explicitly when /contact must be a
   * real page navigation.
   */
  buttonAction?: "navigate" | "booking-panel";
  /** Booking-panel category. Required when the button opens the panel. */
  category?: BookingPanelConfig;
  /** Optional "prefer to call" line, rendered between the body copy
   * and the button. Per-page decision, not a default — omit entirely
   * for a PrimaryCTA with no phone contact. Same pattern as SplitCTA's
   * primaryContact; this prop is optional so existing PrimaryCTA call
   * sites without it are unaffected. */
  contactLine?: PrimaryCTAContact;
};

function resolveButtonAction(
  href: string,
  buttonAction?: "navigate" | "booking-panel"
): "navigate" | "booking-panel" {
  if (buttonAction) return buttonAction;
  return href === "/contact" ? "booking-panel" : "navigate";
}

function PrimaryCTAButton({
  href,
  className,
  children,
  category,
  buttonAction,
}: {
  href: string;
  className: string;
  children: string;
  category?: BookingPanelConfig;
  buttonAction?: "navigate" | "booking-panel";
}) {
  const action = resolveButtonAction(href, buttonAction);

  if (action === "booking-panel") {
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          if (category) window.openBookingPanel(category);
        }}
      >
        {children}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

export function PrimaryCTA({
  eyebrow,
  heading,
  body,
  buttonText,
  buttonLink,
  buttonAction,
  category,
  contactLine,
}: PrimaryCTAProps) {
  return (
    <section className="dci-cta">
      <CircleGroup size="lg" surface="light" position="top-right" />
      <div className="container">
        <div className="dci-cta-row">
          <div className="dci-cta-text">
            {eyebrow && (
              <p className="sec-eyebrow-l" data-reveal="0">
                {eyebrow}
              </p>
            )}
            <h2 className="dci-cta-heading" data-reveal="0">
              {heading}
            </h2>
            <p className="dci-cta-sub" data-reveal="80">
              {body}
            </p>
            {contactLine && (
              <p className="gs-block-phone">
                <span className="gs-block-phone-label">Prefer to call?</span>
                <span className="gs-block-phone-line">
                  Get in touch with {contactLine.name} at{" "}
                  <a href={`tel:${contactLine.phone.replace(/\s+/g, "")}`}>
                    {contactLine.phone}
                  </a>
                  .
                </span>
              </p>
            )}
          </div>
          <span className="dci-cta-button-wrap" data-reveal="160">
            <PrimaryCTAButton
              href={buttonLink}
              className="btn-size-lg btn-surface-amber"
              category={category}
              buttonAction={buttonAction}
            >
              {buttonText}
            </PrimaryCTAButton>
          </span>
        </div>
      </div>
    </section>
  );
}
