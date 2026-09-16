/**
 * Shared submit-button contents: idle label + arrow, or Sending… + spinner.
 * Parent button must set disabled={busy} and aria-busy={busy}.
 */
export function FormSubmitContents({
  busy,
  idleLabel,
  busyLabel = "Sending…",
}: {
  busy: boolean;
  idleLabel: string;
  busyLabel?: string;
}) {
  if (busy) {
    return (
      <>
        <span
          className="form-submit-spinner"
          aria-hidden="true"
        />
        {busyLabel}
      </>
    );
  }

  return (
    <>
      {idleLabel}
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
    </>
  );
}
