import {
  buildKeyValueBodies,
  leadHeading,
  leadSubject,
  sendWebsiteNotification,
} from "@/lib/smtp/sendWebsiteNotification";

export type ContactSubmissionEmailPayload = {
  name: string;
  email: string;
  company: string;
  about: string;
  message: string;
  timestamp?: string;
};

const FORM_NAME = "Contact form";

const ABOUT_LABELS: Record<string, string> = {
  cybersecurity: "Cybersecurity",
  "data-centre-infrastructure": "Data Centre Infrastructure",
  backup: "Backup and Recovery",
  enquiry: "General enquiry",
  partnership: "Partnership",
};

function aboutLabel(value: string) {
  return ABOUT_LABELS[value] ?? value;
}

/** Best-effort email for Contact page “Get in touch” / Send us a message. */
export async function notifyContactSubmission(
  payload: ContactSubmissionEmailPayload,
) {
  const company = payload.company.trim() || "No company given";
  const about = aboutLabel(payload.about);
  const timestamp = payload.timestamp ?? new Date().toISOString();
  const subject = leadSubject(FORM_NAME);

  const { text, html } = buildKeyValueBodies({
    title: leadHeading(FORM_NAME),
    rows: [
      { label: "Form", value: "Contact page — Send us a message" },
      { label: "Name", value: payload.name },
      { label: "Email", value: payload.email },
      { label: "Company", value: company },
      { label: "What's this about", value: about },
      { label: "Message", value: payload.message },
      { label: "Submitted at", value: timestamp },
    ],
  });

  await sendWebsiteNotification({
    logLabel: "notifyContactSubmission",
    subject,
    replyTo: payload.email,
    text,
    html,
  });
}
