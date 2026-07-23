/**
 * SMTP smoke test — verifies auth and sends a test message.
 *
 * Usage:
 *   node --env-file=.env.local scripts/test-smtp.mjs
 */
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST?.trim();
const portRaw = process.env.SMTP_PORT?.trim();
const user = process.env.SMTP_USER?.trim();
const password = process.env.SMTP_PASSWORD;
const from = process.env.SMTP_FROM?.trim();
const secureEnv = process.env.SMTP_SECURE?.trim().toLowerCase();

const TO = "sales@uniware.net";
const CC = ["srimathi.s@uniware.net"];

if (!host || !portRaw || !user || !password || !from) {
  console.error("Missing SMTP_* env vars. Add them to .env.local first.");
  process.exit(1);
}

const port = Number(portRaw);
const secure =
  secureEnv === "true" || secureEnv === "1" || (!secureEnv && port === 465);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass: password },
  name: host,
  tls: { minVersion: "TLSv1.2" },
});

console.log(`Verifying SMTP ${host}:${port} (secure=${secure}) as ${user}...`);
await transporter.verify();
console.log("SMTP verify OK. Sending test message...");

const info = await transporter.sendMail({
  from,
  to: TO,
  cc: CC,
  replyTo: "test@example.com",
  subject: "Uniware website SMTP smoke test",
  text: "This is a smoke test from scripts/test-smtp.mjs for the Uniware website.",
  html: "<p>This is a smoke test from <code>scripts/test-smtp.mjs</code> for the Uniware website.</p>",
  envelope: {
    from: user,
    to: [TO, ...CC],
  },
});

console.log(
  JSON.stringify(
    {
      ok: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    },
    null,
    2,
  ),
);
