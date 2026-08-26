/**
 * Two-zone CTA: single continuous section split by background colour
 * at the two-thirds mark (amber primary, white secondary), not two
 * bordered cards. Layout, proportions, breakpoint behaviour, and
 * styling are fixed by .cta-split/.cta-split-amber/.cta-split-white
 * in globals.css — pages only supply content and links.
 *
 * Stacks below 1024px (mobile and tablet); side by side at 1024px+.
 */
type SplitCTAZone = {
  eyebrow: string;
  heading: string;
  body: string;
  buttonText: string;
  buttonLink: string;
};

type SplitCTAContact = {
  name: string;
  /** Display format, e.g. "+91 98408 61475". The tel: href is derived
   * by stripping whitespace — pass the number as it should read, not
   * as it should link. */
  phone: string;
};

type SplitCTAProps = {
  id?: string;
  primary: SplitCTAZone;
  secondary: SplitCTAZone;
  /** Which booking-panel category this page's CTA falls under —
   * SplitCTA is reused across page types, so the category can't be
   * hardcoded here. Only relevant for a zone whose buttonLink is
   * "/contact". */
  category: BookingPanelConfig;
  /** Optional "prefer to call" line under the primary zone's button.
   * Per-page decision, not a default — omit entirely for a SplitCTA
   * with no phone contact. */
  primaryContact?: SplitCTAContact;
  /** Optional topic to preselect in the booking panel's topic dropdown
   * when the primary zone's button opens it — same preselectedTopic
   * mechanism window.openBookingPanel already supports for datacenter
   * pillar pages. Only applies to the primary zone; omit for a SplitCTA
   * with no specific topic to preselect. */
  primaryPreselectedTopic?: BookingTopic;
};

function SplitCTAButton({
  href,
  className,
  children,
  category,
  preselectedTopic,
}: {
  href: string;
  className: string;
  children: string;
  category: BookingPanelConfig;
  preselectedTopic?: BookingTopic;
}) {
  if (href === "/contact") {
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          window.openBookingPanel(category, preselectedTopic);
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function SplitCTA({
  id,
  primary,
  secondary,
  category,
  primaryContact,
  primaryPreselectedTopic,
}: SplitCTAProps) {
  return (
    <section id={id} className="cta-split" aria-label="Get started">
      <div className="cta-split-amber" data-reveal="0">
        <div className="cta-split-content">
          <p className="gs-block-label">{primary.eyebrow}</p>
          <h2 className="gs-block-heading">{primary.heading}</h2>
          <p className="gs-block-body">{primary.body}</p>
          <div className="card-cta">
            <SplitCTAButton
              href={primary.buttonLink}
              className="btn-size-md btn-surface-amber"
              category={category}
              preselectedTopic={primaryPreselectedTopic}
            >
              {primary.buttonText}
            </SplitCTAButton>
          </div>
          {primaryContact && (
            <p className="gs-block-phone">
              <span className="gs-block-phone-label">Prefer to call?</span>
              <span className="gs-block-phone-line">
                Get in touch with {primaryContact.name} at{" "}
                <a href={`tel:${primaryContact.phone.replace(/\s+/g, "")}`}>
                  {primaryContact.phone}
                </a>
                .
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="cta-split-white" data-reveal="80">
        <p className="gs-block-label">{secondary.eyebrow}</p>
        <h2 className="gs-block-heading">{secondary.heading}</h2>
        <p className="gs-block-body">{secondary.body}</p>
        <div className="card-cta">
          <SplitCTAButton
            href={secondary.buttonLink}
            className="btn-size-md btn-surface-light"
            category={category}
          >
            {secondary.buttonText}
          </SplitCTAButton>
        </div>
      </div>
    </section>
  );
}
