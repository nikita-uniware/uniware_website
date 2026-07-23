import nodemailer from "nodemailer";
import {
  answerOptions,
  domains,
  questions,
  tierCopy,
  type AnswerValue,
  type TierId,
} from "@/content/cyber-readiness-assessment-data";

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

const TO = "sales@uniware.net";
const CC = ["srimathi.s@uniware.net"];

function answerLabel(value: AnswerValue) {
  return (
    answerOptions.find((option) => option.value === value)?.label ?? String(value)
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBodies(payload: AssessmentEmailPayload, ref: string) {
  const tier = tierCopy[payload.tier];

  const summaryRows: { label: string; value: string }[] = [
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

  const signOff = ["", "Thanks,", "Uniware team"].join("\n");

  const text = [
    "New Uniware Cyber Readiness Assessment submission",
    `Reference: ${ref}`,
    "",
    ...summaryRows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Answers:",
    ...answerLines,
    signOff,
  ].join("\n");

  const htmlSummary = summaryRows
    .map(
      (row) =>
        `<tr><td style="padding:6px 10px;border:1px solid #ddd;"><strong>${escapeHtml(row.label)}</strong></td><td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(row.value)}</td></tr>`,
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
      <p style="margin:0 0 12px;"><strong>New Uniware Cyber Readiness Assessment</strong></p>
      <p style="margin:0 0 16px;">Reference: <code>${escapeHtml(ref)}</code></p>
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

/**
 * Best-effort SMTP notification for assessment submissions.
 * Missing env → skip (log only). Send failure → throw for caller to catch/log.
 */
export async function notifyAssessmentSubmission(payload: AssessmentEmailPayload) {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.replace(/^['"]|['"]$/g, "");
  const from = process.env.SMTP_FROM?.trim();
  const secureEnv = process.env.SMTP_SECURE?.trim().toLowerCase();

  if (!host || !portRaw || !user || !password || !from) {
    console.warn(
      "[notifyAssessmentSubmission] SMTP notification skipped — missing SMTP_* env vars",
    );
    return;
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port)) {
    console.warn("[notifyAssessmentSubmission] SMTP notification skipped — invalid SMTP_PORT");
    return;
  }

  const secure =
    secureEnv === "true" || secureEnv === "1" || (!secureEnv && port === 465);

  const ref = `CRA-${Date.now().toString(36).toUpperCase()}`;
  const { text, html } = buildBodies(payload, ref);
  const subject = `[Uniware] Cyber readiness assessment (${ref}) - ${payload.company}`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass: password },
    name: host,
    tls: { minVersion: "TLSv1.2" },
  });

  await transporter.verify();

  // Put both mailboxes in `to` as well as keeping CC — some filters drop CC-only copies.
  const recipients = [TO, ...CC];

  const info = await transporter.sendMail({
    from,
    to: recipients,
    cc: CC,
    replyTo: payload.email,
    subject,
    text,
    html,
    envelope: {
      from: user,
      to: recipients,
    },
  });

  console.info("[notifyAssessmentSubmission] sent", {
    ref,
    subject,
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  });
}
