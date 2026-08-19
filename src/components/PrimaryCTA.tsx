import { CircleGroup } from "@/components/CircleGroup";

/**
 * Single-zone amber CTA: one continuous section, no secondary zone.
 * Layout, proportions, min-height, heading font-size tokens, and the
 * CircleGroup decoration (top-right, lg, surface="light") are fixed
 * by .dci-cta/.dci-cta-row/.dci-cta-heading/.dci-cta-sub in
 * data-centre-infrastructure.page.css — pages only supply content
 * and a link.
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
  /** Optional "prefer to call" line under the button. Per-page
   * decision, not a default — omit entirely for a PrimaryCTA with
   * no phone contact. Same pattern as SplitCTA's primaryContact. */
  contact?: PrimaryCTAContact;
};

function PrimaryCTAButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: string;
}) {
  if (href === "/contact") {
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          window.openBookingPanel();
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
  contact,
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
          </div>
          <span className="dci-cta-button-wrap" data-reveal="160">
            <PrimaryCTAButton href={buttonLink} className="btn-size-lg btn-surface-amber">
              {buttonText}
            </PrimaryCTAButton>
            {contact && (
              <p className="gs-block-phone">
                <span className="gs-block-phone-label">Prefer to call?</span>
                <span className="gs-block-phone-line">
                  Get in touch with {contact.name} at{" "}
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
                    {contact.phone}
                  </a>
                  .
                </span>
              </p>
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
