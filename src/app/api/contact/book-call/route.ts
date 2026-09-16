import { after, NextRequest, NextResponse } from "next/server";
import {
  notifyBookingRequest,
  type BookingRequestEmailPayload,
} from "@/lib/notifyBookingRequest";
import {
  isCheckConstraintError,
  isNetworkDbError,
  withNetworkRetries,
} from "@/lib/supabase/formInsert";
import { supabaseAdmin } from "@/lib/supabase/server";

function wantsJson(req: NextRequest) {
  return (req.headers.get("accept") ?? "").includes("application/json");
}

const TOPICS_BY_CONTEXT = {
  cybersecurity: new Set(["cybersecurity", "backup", "enquiry"]),
  datacenter: new Set([
    "server",
    "storage",
    "network",
    "virtualization",
    "data-security",
    "enquiry",
  ]),
  cloud: new Set([
    "cloud-infrastructure",
    "cloud-networking",
    "cloud-operations",
    "cloud-security",
    "enquiry",
  ]),
  aws: new Set([
    "aws-migration",
    "aws-managed-services",
    "aws-consulting",
    "aws-enquiry",
  ]),
  "aws-workloads": new Set(["amazon-rds", "generative-ai", "aws-enquiry"]),
} as const;

function resolveBookingContext(
  raw: string
): BookingRequestEmailPayload["booking_context"] {
  if (raw === "datacenter" || raw === "infrastructure") return "datacenter";
  if (raw === "cloud") return "cloud";
  if (raw === "aws") return "aws";
  if (raw === "aws-workloads") return "aws-workloads";
  return "cybersecurity";
}

/**
 * Booking panel form handler.
 * 1) Save to Supabase booking_requests
 * 2) Best-effort SMTP email to sales (failure does not fail the request)
 *
 * If Supabase is unreachable from this network, email-only success so the
 * lead is not lost (same pattern as /api/contact).
 */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const preferred = form.getAll("preferred_time[]").map(String);
  const bookingContext = resolveBookingContext(
    String(form.get("booking_context") ?? "cybersecurity")
  );
  const submittedTopics = form.getAll("topic[]").map(String);
  // Legacy single-select field still accepted if present.
  const legacyTopic = String(form.get("topic") ?? "");
  if (legacyTopic) submittedTopics.push(legacyTopic);

  const topics = Array.from(
    new Set(
      submittedTopics.filter((topic) =>
        TOPICS_BY_CONTEXT[bookingContext].has(topic)
      )
    )
  );
  const payload: Omit<BookingRequestEmailPayload, "timestamp"> = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    company: String(form.get("company") ?? "").trim(),
    country: String(form.get("country") ?? "").trim(),
    booking_context: bookingContext,
    topics,
    preferred_time: preferred,
    notes: String(form.get("notes") ?? "").trim(),
  };

  if (
    !payload.name ||
    !payload.email ||
    !payload.country ||
    payload.topics.length === 0
  ) {
    if (wantsJson(req)) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  const joinedTopics = payload.topics.join(",");
  const legacyTopicOk =
    payload.topics.length === 1 &&
    (payload.topics[0] === "cybersecurity" ||
      payload.topics[0] === "backup" ||
      payload.topics[0] === "enquiry");
  const topicForDb = legacyTopicOk ? payload.topics[0] : joinedTopics;
  const notesForDb =
    !legacyTopicOk && payload.topics.length > 0
      ? [`Topics: ${joinedTopics}`, payload.notes].filter(Boolean).join("\n\n")
      : payload.notes || null;

  let insert = await withNetworkRetries("book-call", () =>
    supabaseAdmin.from("booking_requests").insert({
      name: payload.name,
      email: payload.email,
      company: payload.company || null,
      country: payload.country,
      topic: topicForDb,
      preferred_times: payload.preferred_time,
      notes: notesForDb,
    }),
  );
  let error = insert.error;

  if (error && !legacyTopicOk && isCheckConstraintError(error)) {
    console.warn(
      "[book-call] topic check rejected value; retrying with legacy topic=enquiry:",
      error.message,
    );
    insert = await withNetworkRetries("book-call-legacy", () =>
      supabaseAdmin.from("booking_requests").insert({
        name: payload.name,
        email: payload.email,
        company: payload.company || null,
        country: payload.country,
        topic: "enquiry",
        preferred_times: payload.preferred_time,
        notes: notesForDb,
      }),
    );
    error = insert.error;
  }

  const emailPayload = {
    ...payload,
    timestamp: new Date().toISOString(),
  };

  if (error && isNetworkDbError(error)) {
    console.error(
      "[book-call] Supabase unreachable — sending email only so the lead is not lost:",
      error.message,
      error.details,
    );
    try {
      await notifyBookingRequest(emailPayload);
    } catch (emailError) {
      console.error("[book-call] email notification failed:", emailError);
      if (wantsJson(req)) {
        return NextResponse.json(
          { ok: false, error: "db_unreachable" },
          { status: 503 },
        );
      }
      return NextResponse.redirect(new URL("/contact", req.url), 303);
    }
    if (wantsJson(req)) {
      return NextResponse.json({ ok: true, persisted: false });
    }
    return NextResponse.redirect(new URL("/contact?booked=1", req.url), 303);
  }

  if (error) {
    console.error("[book-call] supabase insert failed:", error);
    if (wantsJson(req)) {
      return NextResponse.json({ ok: false, error: "db_insert_failed" }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  after(() =>
    notifyBookingRequest(emailPayload).catch((emailError) => {
      console.error("[book-call] email notification failed:", emailError);
    }),
  );

  if (wantsJson(req)) {
    return NextResponse.json({ ok: true, persisted: true });
  }
  return NextResponse.redirect(new URL("/contact?booked=1", req.url), 303);
}
