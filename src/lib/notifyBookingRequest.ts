import {
  buildKeyValueBodies,
  sendWebsiteNotification,
} from "@/lib/smtp/sendWebsiteNotification";

export type BookingRequestEmailPayload = {
  name: string;
  email: string;
  company: string;
  country: string;
  topic: string;
  preferred_time: string[];
  notes: string;
  timestamp?: string;
};

const TOPIC_LABELS: Record<string, string> = {
  cybersecurity: "Cybersecurity",
  backup: "Backup and Recovery",
  enquiry: "General enquiry",
};

const COUNTRY_LABELS: Record<string, string> = {
  IN: "India",
  GB: "United Kingdom",
  AE: "United Arab Emirates",
  SG: "Singapore",
  US: "United States",
  AU: "Australia",
  DE: "Germany",
  NL: "Netherlands",
  FR: "France",
  CA: "Canada",
  MY: "Malaysia",
  other: "Other",
};

const TIME_LABELS: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

function topicLabel(value: string) {
  return TOPIC_LABELS[value] ?? value;
}

function countryLabel(value: string) {
  return COUNTRY_LABELS[value] ?? value;
}

function preferredTimesLabel(values: string[]) {
  if (!values.length) return "Not specified";
  return values.map((v) => TIME_LABELS[v] ?? v).join(", ");
}

/** Best-effort email for booking panel / “Book a security review”. */
export async function notifyBookingRequest(payload: BookingRequestEmailPayload) {
  const company = payload.company.trim() || "No company given";
  const topic = topicLabel(payload.topic);
  const timestamp = payload.timestamp ?? new Date().toISOString();
  const subject = `[Uniware] Book a security review — ${topic} — ${company}`;

  const { text, html } = buildKeyValueBodies({
    title: "New Uniware website lead — Book a security review",
    rows: [
      { label: "Form", value: "Booking panel — Book a security review / Book a call" },
      { label: "Name", value: payload.name },
      { label: "Email", value: payload.email },
      { label: "Company", value: company },
      { label: "Country", value: countryLabel(payload.country) },
      { label: "Topic", value: topic },
      { label: "Preferred time", value: preferredTimesLabel(payload.preferred_time) },
      { label: "Notes", value: payload.notes.trim() || "—" },
      { label: "Submitted at", value: timestamp },
    ],
  });

  await sendWebsiteNotification({
    logLabel: "notifyBookingRequest",
    subject,
    replyTo: payload.email,
    text,
    html,
  });
}
