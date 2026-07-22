import { Button } from "@/components/Button";
import { ContentWrapper } from "@/components/ContentWrapper";
import { domains } from "@/content/cyber-readiness-assessment-data";

export function DomainIntroScreen({
  domainIndex,
  onBegin,
}: {
  domainIndex: number;
  onBegin: () => void;
}) {
  const domain = domains[domainIndex];

  return (
    <section className="min-h-dvh flex items-center bg-linear-90 from-uw-dark-blue to-uw-black py-12 md:py-16 lg:py-24">
      <ContentWrapper>
        <div className="max-w-[640px] mx-auto text-center">
          <div className="inline-block text-[length:var(--text-caption)] font-body font-bold uppercase tracking-[0.12em] text-uw-amber-dark bg-[rgba(233,166,56,0.12)] border border-[rgba(233,166,56,0.3)] px-3.5 py-1.5 rounded mb-6">
            Domain {domainIndex + 1} of {domains.length}
          </div>

          <h2 className="font-display font-bold text-[length:var(--text-h3-sm)] md:text-[length:var(--text-h3-md)] lg:text-h3 leading-[1.2] tracking-[-0.01em] text-uw-white mb-5">
            {domain.name}
          </h2>

          <p className="text-body font-body font-light text-[color:var(--uw-text-on-dark)] leading-[1.75] mb-10">
            {domain.description}
          </p>

          <div className="flex items-center justify-center gap-1.5 mb-10">
            {domains.map((_, i) => {
              const state = i < domainIndex ? "done" : i === domainIndex ? "active" : "upcoming";
              const width = state === "done" ? "w-8" : state === "active" ? "w-12" : "w-6";
              const bg =
                state === "done"
                  ? "bg-uw-amber-dark"
                  : state === "active"
                    ? "bg-[rgba(233,166,56,0.6)]"
                    : "bg-[color:var(--surface-dark-muted)]";
              return (
                <div key={i} className={`h-[3px] rounded-sm ${width} ${bg}`} aria-hidden="true" />
              );
            })}
          </div>

          <Button surface="dark" variant="primary" size="lg" withArrow onClick={onBegin}>
            Begin this section
          </Button>
        </div>
      </ContentWrapper>
    </section>
  );
}
