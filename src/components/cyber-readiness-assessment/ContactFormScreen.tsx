import { Clock, LockKey } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/Button";
import { ContentWrapper } from "@/components/ContentWrapper";

export type ContactDetails = {
  firstName: string;
  company: string;
  email: string;
};

export function ContactFormScreen({
  contact,
  onChange,
  onSubmit,
  submitting,
}: {
  contact: ContactDetails;
  onChange: (contact: ContactDetails) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  return (
    <section className="bg-uw-white">
      <ContentWrapper className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[680px] mx-auto">
          <div className="text-eyebrow font-body font-medium uppercase text-uw-amber-light mb-4">
            Almost there
          </div>

          <h2 className="font-display font-bold text-[length:var(--text-h3-sm)] md:text-[length:var(--text-h3-md)] lg:text-h3 leading-[1.2] tracking-[-0.01em] text-uw-black mb-3">
            Where should we send your readiness report?
          </h2>

          <p className="text-body-sm font-body text-uw-body-text leading-[1.75] max-w-[520px] mb-10">
            Your personalised summary will be ready within one business day. A specialist from
            our team will review your responses before reaching out.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <label
              htmlFor="cra-first-name"
              className="block text-[length:var(--text-caption-xs)] font-body font-bold uppercase tracking-[0.08em] text-uw-muted mb-2"
            >
              First name
            </label>
            <input
              id="cra-first-name"
              type="text"
              required
              placeholder="Your first name"
              value={contact.firstName}
              onChange={(event) => onChange({ ...contact, firstName: event.target.value })}
              className="w-full px-4 py-3.5 border border-border-light rounded-lg font-body text-body-sm text-uw-black outline-none transition-colors duration-150 ease-in-out focus:border-uw-black mb-6"
            />

            <label
              htmlFor="cra-company"
              className="block text-[length:var(--text-caption-xs)] font-body font-bold uppercase tracking-[0.08em] text-uw-muted mb-2"
            >
              Company name
            </label>
            <input
              id="cra-company"
              type="text"
              required
              placeholder="Your organisation"
              value={contact.company}
              onChange={(event) => onChange({ ...contact, company: event.target.value })}
              className="w-full px-4 py-3.5 border border-border-light rounded-lg font-body text-body-sm text-uw-black outline-none transition-colors duration-150 ease-in-out focus:border-uw-black mb-6"
            />

            <label
              htmlFor="cra-email"
              className="block text-[length:var(--text-caption-xs)] font-body font-bold uppercase tracking-[0.08em] text-uw-muted mb-2"
            >
              Work email
            </label>
            <input
              id="cra-email"
              type="email"
              required
              placeholder="you@company.com"
              value={contact.email}
              onChange={(event) => onChange({ ...contact, email: event.target.value })}
              className="w-full px-4 py-3.5 border border-border-light rounded-lg font-body text-body-sm text-uw-black outline-none transition-colors duration-150 ease-in-out focus:border-uw-black mb-2"
            />
            <p className="text-[length:var(--text-caption)] font-body text-uw-muted leading-[1.6] mb-7">
              We will only use this to send your report and follow up with you directly. No
              marketing emails.
            </p>

            <div className="h-px bg-border-light my-8" />

            <div className="flex gap-3.5 items-start mb-5">
              <div className="w-9 h-9 bg-[color:var(--surface-light-subtle)] border border-border-light rounded-md flex items-center justify-center flex-shrink-0">
                <LockKey size={16} weight="regular" className="text-uw-black" />
              </div>
              <div className="text-body-sm font-body text-uw-body-text leading-[1.65]">
                <strong className="font-semibold text-uw-black">
                  Your responses are confidential.
                </strong>{" "}
                They are reviewed only by our team to prepare your personalised summary and are
                not shared with any third party.
              </div>
            </div>

            <div className="flex gap-3.5 items-start mb-9">
              <div className="w-9 h-9 bg-[color:var(--surface-light-subtle)] border border-border-light rounded-md flex items-center justify-center flex-shrink-0">
                <Clock size={16} weight="regular" className="text-uw-black" />
              </div>
              <div className="text-body-sm font-body text-uw-body-text leading-[1.65]">
                <strong className="font-semibold text-uw-black">One business day.</strong> A
                Uniware specialist will reach out with your readiness summary and recommended
                next steps. Reviewed by a person, not a bot.
              </div>
            </div>

            <Button
              type="submit"
              surface="light"
              variant="primary"
              size="lg"
              withArrow
              disabled={submitting}
              className={submitting ? "opacity-60 pointer-events-none" : ""}
            >
              {submitting ? "Sending…" : "See my results"}
            </Button>
          </form>
        </div>
      </ContentWrapper>
    </section>
  );
}
