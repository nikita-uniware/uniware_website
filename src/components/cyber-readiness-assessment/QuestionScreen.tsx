import { ContentWrapper } from "@/components/ContentWrapper";
import {
  answerOptions,
  domains,
  questions,
  type AnswerValue,
} from "@/content/cyber-readiness-assessment-data";

export function QuestionScreen({
  questionIndex,
  selectedValue,
  onSelect,
  onBack,
  onNext,
}: {
  questionIndex: number;
  selectedValue: AnswerValue | null;
  onSelect: (value: AnswerValue) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const question = questions[questionIndex];
  const domain = domains[question.domainIndex];
  const isLast = questionIndex === questions.length - 1;
  const canProceed = selectedValue !== null;
  const progressPercent = (questionIndex / questions.length) * 100;

  return (
    <section className="bg-uw-white">
      <div className="bg-linear-90 from-uw-dark-blue to-uw-black">
        <ContentWrapper>
          <div className="flex items-center justify-between h-[52px]">
            <div className="text-[length:var(--text-caption-xs)] font-body font-medium uppercase tracking-[0.1em] text-[color:var(--uw-text-on-dark)]">
              {domain.name}
            </div>
            <div className="text-body-sm font-body text-[color:var(--uw-text-on-dark-faint)]">
              Question {questionIndex + 1} of {questions.length}
            </div>
          </div>
        </ContentWrapper>
      </div>

      <div className="h-[3px] bg-border-light overflow-hidden">
        <div
          className="h-full bg-uw-amber-light transition-[width] duration-400 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <ContentWrapper className="py-12 md:py-16 lg:py-24">
        <h2 className="font-display font-bold text-[length:var(--text-h3-sm)] md:text-[length:var(--text-h3-md)] lg:text-h3 leading-[1.2] tracking-[-0.01em] text-uw-black mb-11 max-w-[700px]">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3 mb-12" role="radiogroup" aria-label={question.text}>
          {answerOptions.map((option) => {
            const selected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelect(option.value)}
                className={`text-left rounded-md border bg-uw-white px-6 py-5 flex items-start gap-4.5 transition-colors duration-150 ease-in-out hover:border-uw-black hover:bg-[rgba(4,12,37,0.03)] ${
                  selected ? "border-uw-black border-2" : "border-border-light"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                    selected ? "border-uw-black bg-uw-black" : "border-[color:var(--border-light-medium)]"
                  }`}
                >
                  {selected ? (
                    <span className="w-[7px] h-[7px] rounded-full bg-uw-amber-dark" aria-hidden="true" />
                  ) : null}
                </div>
                <div>
                  <div className="text-body font-body font-bold text-uw-black mb-1">
                    {option.label}
                  </div>
                  <div className="text-body-sm font-body text-uw-muted leading-[1.5]">
                    {option.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="border border-[color:var(--border-light-medium)] text-uw-body-text font-body font-medium text-[13px] px-[22px] py-[11px] rounded-lg transition-colors duration-150 ease-in-out hover:border-uw-body-text"
          >
            ← Back
          </button>
          <button
            type="button"
            disabled={!canProceed}
            onClick={onNext}
            className={`bg-uw-black text-uw-white font-body font-bold text-[13px] px-7 py-[11px] rounded-lg transition-[opacity,background-color] duration-150 ease-in-out ${
              canProceed ? "opacity-100 hover:bg-uw-dark-blue" : "opacity-35 pointer-events-none"
            }`}
          >
            {isLast ? "Complete assessment →" : "Next question →"}
          </button>
        </div>
      </ContentWrapper>
    </section>
  );
}
