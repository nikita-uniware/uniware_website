import { NextRequest, NextResponse } from "next/server";
import { notifyContactSubmission } from "@/lib/notifyContactSubmission";
import { supabaseAdmin } from "@/lib/supabase/server";

function wantsJson(req: NextRequest) {
  return (req.headers.get("accept") ?? "").includes("application/json");
}

const LEGACY_ABOUT = new Set([
  "cybersecurity",
  "backup",
  "enquiry",
  "partnership",
]);

/**
 * Contact form handler.
 * 1) Save to Supabase contact_submissions
 * 2) Best-effort SMTP email to sales (failure does not fail the request)
 */
export async function POST(req: NextRequest) {
  const form = await req.formData();

  // Support single `about` or multi-select `about[]` (comma-joined in DB).
  const aboutParts = [
    ...form.getAll("about[]").map(String),
    ...String(form.get("about") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ];
  const about = Array.from(new Set(aboutParts)).join(",");

  const payload = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    company: String(form.get("company") ?? "").trim(),
    about,
    message: String(form.get("message") ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.about || !payload.message) {
    if (wantsJson(req)) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  let { error } = await supabaseAdmin.from("contact_submissions").insert({
    name: payload.name,
    email: payload.email,
    company: payload.company || null,
    about: payload.about,
    message: payload.message,
  });

  // Older DBs only allow cybersecurity/backup/enquiry/partnership — retry so
  // Cloud/AWS/AI options still save until the CHECK is dropped.
  if (error && !LEGACY_ABOUT.has(payload.about)) {
    console.warn(
      "[contact] about insert failed; retrying with legacy about=enquiry:",
      error.message,
    );
    const retry = await supabaseAdmin.from("contact_submissions").insert({
      name: payload.name,
      email: payload.email,
      company: payload.company || null,
      about: "enquiry",
      message: [`About: ${payload.about}`, payload.message]
        .filter(Boolean)
        .join("\n\n"),
    });
    error = retry.error;
  }

  if (error) {
    console.error("[contact] supabase insert failed:", error);
    if (wantsJson(req)) {
      return NextResponse.json({ ok: false, error: "db_insert_failed" }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  try {
    await notifyContactSubmission({
      ...payload,
      timestamp: new Date().toISOString(),
    });
  } catch (emailError) {
    console.error("[contact] email notification failed:", emailError);
  }

  if (wantsJson(req)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/contact?sent=1", req.url), 303);
}
