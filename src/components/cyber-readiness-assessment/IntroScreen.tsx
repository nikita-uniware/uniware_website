import { Button } from "@/components/Button";
import { ContentWrapper } from "@/components/ContentWrapper";

const previewCards = [
  {
    label: "Good shape",
    accent: "var(--status-strong)",
    title: "Strong foundations in place.",
    description:
      "You have clearly invested in readiness. A conversation with our team identifies where your attention has the most impact going forward.",
  },
  {
    label: "Some gaps identified",
    accent: "var(--status-developing)",
    title: "A solid start, with areas to develop.",
    description:
      "This is where most organisations sit. Gaps worth understanding before they become a problem. Addressable with the right guidance.",
  },
  {
    label: "Attention needed",
    accent: "var(--status-attention)",
    title: "Foundations need attention. Knowing that puts you ahead.",
    description:
      "Many organisations haven't built these foundations yet. Knowing where you stand is the first step. We help you prioritise what gives you the most protection, quickly.",
  },
];

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="bg-linear-90 from-uw-dark-blue to-uw-black py-12 md:py-16 lg:py-24">
      <ContentWrapper>
        <div className="mb-4 text-eyebrow uppercase text-uw-amber-dark font-body font-medium">
          The assessment
        </div>

        <h1 className="font-display font-bold text-[length:var(--text-h2-sm)] lg:text-h2 leading-[1.15] tracking-[-0.015em] text-uw-white mb-4 max-w-[880px]">
          15 questions. 3 minutes. A clear picture of your{" "}
          <span className="text-uw-amber-dark">cyber incident readiness.</span>
        </h1>

        <p className="text-body-lg font-body font-light text-[color:var(--uw-text-on-dark)] leading-[1.7] max-w-[580px] mb-10">
          No technical expertise needed. Answer based on what is actually in place today. The
          goal is clarity, not a score.
        </p>

        <Button surface="dark" variant="primary" size="lg" withArrow onClick={onStart}>
          Start the assessment
        </Button>
        <p className="text-body-sm font-body text-[color:var(--uw-text-on-dark-whisper)] mt-3">
          Free. No obligation. No technical expertise required.
        </p>

        <div className="mt-14">
          <div className="w-px h-[120px] bg-[color:var(--border-chrome-medium)] mb-6" aria-hidden="true" />
          <div className="text-eyebrow uppercase font-body font-medium text-[color:var(--uw-text-on-dark-subtle)] mb-5">
            What your results will show
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {previewCards.map((card) => (
              <div
                key={card.label}
                className="rounded-lg p-5 border border-border-dark bg-[color:var(--surface-dark-muted)]"
                style={{ borderLeft: `4px solid ${card.accent}` }}
              >
                <div
                  className="inline-flex items-center gap-1.5 text-[length:var(--text-caption)] font-body font-bold uppercase tracking-[0.1em] mb-3 px-2.5 py-1 rounded"
                  style={{ background: `${card.accent}33`, color: card.accent }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
                  {card.label}
                </div>
                <div className="font-display font-semibold text-body-lg leading-[1.3] text-uw-white mb-2">
                  {card.title}
                </div>
                <div className="font-body font-light text-body leading-[1.65] text-[color:var(--uw-text-on-dark-muted)]">
                  {card.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
