import {
  buildKeyValueBodies,
  leadHeading,
  leadSubject,
  sendWebsiteNotification,
} from "@/lib/smtp/sendWebsiteNotification";

export type BookingRequestEmailPayload = {
  name: string;
  email: string;
  company: string;
  country: string;
  booking_context: "cybersecurity" | "datacenter" | "cloud";
  topics: string[];
  preferred_time: string[];
  notes: string;
  timestamp?: string;
};

const FORM_NAMES = {
  cybersecurity: "Book a security review",
  datacenter: "Talk to an infrastructure expert",
  cloud: "Talk about your cloud environment",
} as const;

const FORM_LABELS = {
  cybersecurity: "Booking panel: Book a security review / Book a call",
  datacenter: "Booking panel: Data Centre Infrastructure",
  cloud: "Booking panel: Cloud",
} as const;

const TOPIC_LABELS: Record<string, string> = {
  cybersecurity: "Cybersecurity",
  backup: "Backup and Recovery",
  server: "Server",
  storage: "Storage",
  network: "Networking",
  virtualization: "Virtualization / HCI",
  "data-security": "Data Security",
  "cloud-infrastructure": "Cloud Infrastructure",
  "cloud-networking": "Cloud Networking",
  "cloud-operations": "Cloud Operations",
  "cloud-security": "Cloud Security",
  "aws-migration": "AWS Migration",
  "aws-consulting": "AWS Consulting",
  "aws-managed-services": "AWS Managed Services",
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

function topicsLabel(values: string[]) {
  return values.map((value) => TOPIC_LABELS[value] ?? value).join(", ");
}

function countryLabel(value: string) {
  return COUNTRY_LABELS[value] ?? value;
}

function preferredTimesLabel(values: string[]) {
  if (!values.length) return "Not specified";
  return values.map((v) => TIME_LABELS[v] ?? v).join(", ");
}

/** Best-effort email for booking panel. */
export async function notifyBookingRequest(payload: BookingRequestEmailPayload) {
  const company = payload.company.trim() || "No company given";
  const formName = FORM_NAMES[payload.booking_context];
  const topics = topicsLabel(payload.topics);
  const timestamp = payload.timestamp ?? new Date().toISOString();
  const subject = leadSubject(formName);

  const { text, html } = buildKeyValueBodies({
    title: leadHeading(formName),
    rows: [
      {
        label: "Form",
        value: FORM_LABELS[payload.booking_context],
      },
      { label: "Name", value: payload.name },
      { label: "Email", value: payload.email },
      { label: "Company", value: company },
      { label: "Country", value: countryLabel(payload.country) },
      {
        label: payload.topics.length > 1 ? "Topics" : "Topic",
        value: topics,
      },
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
