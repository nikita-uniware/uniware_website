import {
  answerOptions,
  domains,
  questions,
  tierCopy,
  type AnswerValue,
  type TierId,
} from "@/content/cyber-readiness-assessment-data";
import {
  escapeHtml,
  sendWebsiteNotification,
} from "@/lib/smtp/sendWebsiteNotification";

export type AssessmentEmailPayload = {
  firstName: string;
  company: string;
  email: string;
  answers: AnswerValue[];
  domainScores: number[];
  overallScore: number;
  tier: TierId;
  timestamp: string;
};

function answerLabel(value: AnswerValue) {
  return (
    answerOptions.find((option) => option.value === value)?.label ?? String(value)
  );
}

function buildBodies(payload: AssessmentEmailPayload, ref: string) {
  const tier = tierCopy[payload.tier];

  const summaryRows: { label: string; value: string }[] = [
    { label: "Form", value: "Cyber Readiness Assessment" },
    { label: "Reference", value: ref },
    { label: "First name", value: payload.firstName },
    { label: "Company", value: payload.company },
    { label: "Email", value: payload.email },
    { label: "Overall score", value: `${payload.overallScore} / 30` },
    { label: "Tier", value: `${tier.badge} (${payload.tier})` },
    { label: "Submitted at", value: payload.timestamp },
  ];

  payload.domainScores.forEach((score, index) => {
    summaryRows.push({
      label: domains[index]?.name ?? `Domain ${index + 1}`,
      value: `${score} / 6`,
    });
  });

  const answerLines = questions.map((question, index) => {
    const answer = payload.answers[index];
    const label = answer === undefined ? "—" : answerLabel(answer);
    return `Q${index + 1} [${domains[question.domainIndex]?.name ?? "Domain"}] ${label}\n   ${question.text}`;
  });

  const text = [
    "New Uniware website lead — Cyber Readiness Assessment",
    "",
    ...summaryRows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Answers:",
    ...answerLines,
    "",
    "Thanks,",
    "Uniware team",
  ].join("\n");

  const htmlSummary = summaryRows
    .map(
      (row) =>
        `<tr><td style="padding:6px 10px;border:1px solid #ddd;vertical-align:top;"><strong>${escapeHtml(row.label)}</strong></td><td style="padding:6px 10px;border:1px solid #ddd;vertical-align:top;">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("");

  const htmlAnswers = questions
    .map((question, index) => {
      const answer = payload.answers[index];
      const label = answer === undefined ? "—" : answerLabel(answer);
      return `<li style="margin-bottom:8px;"><strong>Q${index + 1} (${escapeHtml(domains[question.domainIndex]?.name ?? "Domain")}):</strong> ${escapeHtml(label)}<br/><span style="color:#555;">${escapeHtml(question.text)}</span></li>`;
    })
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.5;">
      <p style="margin:0 0 16px;"><strong>New Uniware website lead — Cyber Readiness Assessment</strong></p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;margin-bottom:16px;">
        ${htmlSummary}
      </table>
      <p style="margin:0 0 8px;"><strong>Answers</strong></p>
      <ol style="font-size:13px;padding-left:20px;margin:0 0 24px;">${htmlAnswers}</ol>
      <p style="margin:0;">Thanks,<br/>Uniware team</p>
    </div>
  `;

  return { text, html };
}

/** Best-effort SMTP notification for assessment submissions. */
export async function notifyAssessmentSubmission(payload: AssessmentEmailPayload) {
  const ref = `CRA-${Date.now().toString(36).toUpperCase()}`;
  const { text, html } = buildBodies(payload, ref);
  const subject = `[Uniware] Cyber readiness assessment (${ref}) — ${payload.company}`;

  await sendWebsiteNotification({
    logLabel: "notifyAssessmentSubmission",
    subject,
    replyTo: payload.email,
    text,
    html,
  });
}
