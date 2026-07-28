import { NextRequest, NextResponse } from "next/server";
import { notifyBookingRequest } from "@/lib/notifyBookingRequest";
import { supabaseAdmin } from "@/lib/supabase/server";

function wantsJson(req: NextRequest) {
  return (req.headers.get("accept") ?? "").includes("application/json");
}

/**
 * Booking panel form handler.
 * 1) Save to Supabase booking_requests
 * 2) Best-effort SMTP email to sales (failure does not fail the request)
 */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const preferred = form.getAll("preferred_time[]").map(String);
  const payload = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    company: String(form.get("company") ?? "").trim(),
    country: String(form.get("country") ?? "").trim(),
    topic: String(form.get("topic") ?? "").trim(),
    preferred_time: preferred,
    notes: String(form.get("notes") ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.country || !payload.topic) {
    if (wantsJson(req)) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  const { error } = await supabaseAdmin.from("booking_requests").insert({
    name: payload.name,
    email: payload.email,
    company: payload.company || null,
    country: payload.country,
    topic: payload.topic,
    preferred_times: payload.preferred_time,
    notes: payload.notes || null,
  });

  if (error) {
    console.error("[book-call] supabase insert failed:", error);
    if (wantsJson(req)) {
      return NextResponse.json({ ok: false, error: "db_insert_failed" }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  try {
    await notifyBookingRequest({
      ...payload,
      timestamp: new Date().toISOString(),
    });
  } catch (emailError) {
    console.error("[book-call] email notification failed:", emailError);
  }

  if (wantsJson(req)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/contact?booked=1", req.url), 303);
}
