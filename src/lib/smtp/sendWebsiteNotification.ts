import nodemailer from "nodemailer";

export const WEBSITE_FORM_TO = "sales@uniware.net";
export const WEBSITE_FORM_CC = ["srimathi.s@uniware.net", "nikita@uniware.net"];

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildKeyValueBodies(opts: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  const text = [
    opts.title,
    "",
    ...opts.rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Thanks,",
    "Uniware team",
  ].join("\n");

  const htmlRows = opts.rows
    .map(
      (row) =>
        `<tr><td style="padding:6px 10px;border:1px solid #ddd;vertical-align:top;"><strong>${escapeHtml(row.label)}</strong></td><td style="padding:6px 10px;border:1px solid #ddd;vertical-align:top;">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.5;">
      <p style="margin:0 0 16px;"><strong>${escapeHtml(opts.title)}</strong></p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;margin-bottom:24px;">
        ${htmlRows}
      </table>
      <p style="margin:0;">Thanks,<br/>Uniware team</p>
    </div>
  `;

  return { text, html };
}

/**
 * Shared SMTP send for website lead notifications.
 * Missing env → skip (log only). Send failure → throw for caller to catch/log.
 */
export async function sendWebsiteNotification(opts: {
  logLabel: string;
  subject: string;
  replyTo: string;
  text: string;
  html: string;
}) {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.replace(/^['"]|['"]$/g, "");
  const from = process.env.SMTP_FROM?.trim().replace(/^['"]|['"]$/g, "");
  const secureEnv = process.env.SMTP_SECURE?.trim().toLowerCase();

  if (!host || !portRaw || !user || !password || !from) {
    console.warn(`[${opts.logLabel}] SMTP notification skipped — missing SMTP_* env vars`);
    return;
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port)) {
    console.warn(`[${opts.logLabel}] SMTP notification skipped — invalid SMTP_PORT`);
    return;
  }

  const secure =
    secureEnv === "true" || secureEnv === "1" || (!secureEnv && port === 465);

  const to = WEBSITE_FORM_TO;
  const cc = WEBSITE_FORM_CC;
  const envelopeRecipients = [to, ...cc];

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
    to,
    cc,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    envelope: {
      from: user,
      to: envelopeRecipients,
    },
  });

  console.info(`[${opts.logLabel}] sent`, {
    subject: opts.subject,
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  });
}
