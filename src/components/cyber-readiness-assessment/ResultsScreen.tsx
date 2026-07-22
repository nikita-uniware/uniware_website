import { ContentWrapper } from "@/components/ContentWrapper";
import {
  contactEmail,
  contactName,
  contactPhoneDisplay,
  contactPhoneHref,
  domains,
  tierCopy,
  type TierId,
} from "@/content/cyber-readiness-assessment-data";
import {
  getBarWidthPercent,
  getDomainStatus,
  type DomainStatus,
} from "@/lib/cyber-readiness-scoring";

const tierStyles: Record<TierId, { border: string; badgeBg: string; badgeText: string }> = {
  good: {
    border: "var(--tier-good-border)",
    badgeBg: "var(--tier-good-badge-bg)",
    badgeText: "var(--tier-good-badge-text)",
  },
  some: {
    border: "var(--tier-some-border)",
    badgeBg: "var(--tier-some-badge-bg)",
    badgeText: "var(--tier-some-badge-text)",
  },
  attention: {
    border: "var(--tier-attention-border)",
    badgeBg: "var(--tier-attention-badge-bg)",
    badgeText: "var(--tier-attention-badge-text)",
  },
};

const statusLabels: Record<DomainStatus, string> = {
  strong: "Strong",
  developing: "Developing",
  "needs-attention": "Needs attention",
};

const statusColors: Record<DomainStatus, { bar: string; text: string }> = {
  strong: { bar: "var(--status-strong)", text: "var(--status-strong-text)" },
  developing: { bar: "var(--status-developing)", text: "var(--status-developing-text)" },
  "needs-attention": { bar: "var(--status-attention)", text: "var(--status-attention-text)" },
};

export function ResultsScreen({
  tier,
  domainScores,
  onStartOver,
}: {
  tier: TierId;
  domainScores: number[];
  onStartOver: () => void;
}) {
  const copy = tierCopy[tier];
  const style = tierStyles[tier];

  return (
    <section className="bg-uw-white">
      <ContentWrapper className="py-16 md:py-20 lg:py-24">
        <div
          className="inline-flex items-center gap-2 text-[length:var(--text-caption)] font-body font-bold uppercase tracking-[0.1em] px-3.5 py-1.5 rounded-full mb-6"
          style={{ background: style.badgeBg, color: style.badgeText }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
          {copy.badge}
        </div>

        <h2 className="font-display font-bold text-[length:var(--text-h3-sm)] md:text-[length:var(--text-h3-md)] lg:text-h3 leading-[1.2] tracking-[-0.01em] text-uw-black mb-3.5 max-w-[640px]">
          {copy.headline}
        </h2>
        <p className="text-body font-body text-uw-body-text leading-[1.75] max-w-[600px] mb-13">
          {copy.body}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14 items-start">
          <div className="rounded-xl border border-border-light bg-[color:var(--surface-light-subtle)] px-7 pt-7 pb-2">
            <div className="text-[length:var(--text-caption-xs)] font-body font-bold uppercase tracking-[0.1em] text-uw-muted mb-5">
              Your domain breakdown
            </div>
            {domains.map((domain, i) => {
              const score = domainScores[i];
              const status = getDomainStatus(score);
              const colors = statusColors[status];
              const width = getBarWidthPercent(score);
              return (
                <div key={domain.name} className="mb-5">
                  <div className="flex justify-between items-center text-[length:var(--text-caption)] font-body font-semibold text-uw-body-text mb-2">
                    <span>{domain.name}</span>
                    <span
                      className="text-[length:var(--text-caption-xs)] font-body font-bold uppercase tracking-[0.06em]"
                      style={{ color: colors.text }}
                    >
                      {statusLabels[status]}
                    </span>
                  </div>
                  <div className="h-[5px] bg-border-light rounded-sm overflow-hidden">
                    <div
                      className="h-full rounded-sm"
                      style={{ width: `${width}%`, background: colors.bar }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl bg-uw-yellow-card border border-[color:var(--section-divider)] p-9 md:p-10">
            <div className="text-eyebrow font-body font-medium uppercase text-uw-amber-accent mb-3.5">
              What happens next
            </div>
            <h3 className="font-display font-semibold text-[length:var(--text-h4-sm)] lg:text-h4 leading-[1.3] text-uw-black mb-3">
              We&apos;ll be in touch if there&apos;s something worth discussing.
            </h3>
            <p className="text-body-sm font-body font-light text-uw-body-text leading-[1.7] mb-7">
              Our team reviews every submission. If your responses point to gaps that need
              attention, a Uniware specialist will reach out personally within one business day
              with specific observations and recommended next steps.
            </p>
            <div className="h-px bg-[color:var(--section-divider)] mb-6" />
            <p className="text-h4 font-body text-uw-body-text mb-4">
              Don&apos;t want to wait? Contact us directly.
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[length:var(--text-caption-xs)] font-body font-bold uppercase tracking-[0.08em] text-uw-muted min-w-[48px]">
                  Name
                </span>
                <span className="text-body-sm font-body text-uw-body-text">
                  {contactName}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[length:var(--text-caption-xs)] font-body font-bold uppercase tracking-[0.08em] text-uw-muted min-w-[48px]">
                  Email
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-body-sm font-body text-uw-body-text hover:text-uw-amber-light transition-colors duration-150"
                >
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[length:var(--text-caption-xs)] font-body font-bold uppercase tracking-[0.08em] text-uw-muted min-w-[48px]">
                  Phone
                </span>
                <a
                  href={`tel:${contactPhoneHref}`}
                  className="text-body-sm font-body text-uw-body-text hover:text-uw-amber-light transition-colors duration-150"
                >
                  {contactPhoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onStartOver}
            className="border border-[color:var(--border-light-medium)] text-uw-body-text font-body font-medium text-[13px] px-[22px] py-[11px] rounded-lg transition-colors duration-150 ease-in-out hover:border-uw-body-text"
          >
            ← Start over
          </button>
        </div>
      </ContentWrapper>
    </section>
  );
}
