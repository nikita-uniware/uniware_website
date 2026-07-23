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
  return answerOptions.find((option) => option.value === value)?.label ?? String(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBodies(payload: AssessmentEmailPayload) {
  const tier = tierCopy[payload.tier];
  const rows: { label: string; value: string }[] = [
    { label: "First name", value: payload.firstName },
    { label: "Company", value: payload.company },
    { label: "Email", value: payload.email },
    { label: "Overall score", value: `${payload.overallScore} / 30` },
    { label: "Tier", value: `${tier.badge} (${payload.tier})` },
    { label: "Submitted at", value: payload.timestamp },
  ];

  payload.domainScores.forEach((score, index) => {
    rows.push({
      label: `Domain ${index + 1}: ${domains[index]?.name ?? `Domain ${index + 1}`}`,
      value: `${score} / 6`,
    });
  });

  questions.forEach((question, index) => {
    const answer = payload.answers[index];
    rows.push({
      label: `Q${index + 1}. ${question.text}`,
      value: answer === undefined ? "—" : answerLabel(answer),
    });
  });

  const text = [
    "New Uniware Cyber Readiness Assessment submission",
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
  ].join("\n");

  const htmlRows = rows
    .map(
      (row) =>
        `<tr><td style="padding:8px 12px;border:1px solid #ddd;vertical-align:top;"><strong>${escapeHtml(row.label)}</strong></td><td style="padding:8px 12px;border:1px solid #ddd;vertical-align:top;">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("");

  const html = `
    <p><strong>New Uniware Cyber Readiness Assessment submission</strong></p>
    <table style="border-collapse:collapse;width:100%;max-width:720px;font-family:Arial,sans-serif;font-size:14px;">
      ${htmlRows}
    </table>
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
  const password = process.env.SMTP_PASSWORD;
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

  const { text, html } = buildBodies(payload);
  const subject = `New Uniware Cyber Readiness Assessment - ${payload.company}`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass: password },
    name: host,
    tls: { minVersion: "TLSv1.2" },
  });

  await transporter.verify();

  const info = await transporter.sendMail({
    from,
    to: TO,
    cc: CC,
    replyTo: payload.email,
    subject,
    text,
    html,
    envelope: {
      from: user,
      to: [TO, ...CC],
    },
  });

  console.info("[notifyAssessmentSubmission] sent", {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  });
}
