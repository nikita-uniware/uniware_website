import { after, NextRequest, NextResponse } from "next/server";
import { notifyContactSubmission } from "@/lib/notifyContactSubmission";
import {
  isCheckConstraintError,
  isNetworkDbError,
  withNetworkRetries,
} from "@/lib/supabase/formInsert";
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
 *
 * If Supabase is unreachable from this network (TLS reset / DNS issues),
 * we still send the sales email and return success so the lead is not lost.
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

  let insert = await withNetworkRetries("contact", () =>
    supabaseAdmin.from("contact_submissions").insert({
      name: payload.name,
      email: payload.email,
      company: payload.company || null,
      about: payload.about,
      message: payload.message,
    }),
  );
  let error = insert.error;

  // Older DBs only allow cybersecurity/backup/enquiry/partnership — retry so
  // Cloud/AWS/AI options still save until the CHECK is dropped.
  if (
    error &&
    isCheckConstraintError(error) &&
    !LEGACY_ABOUT.has(payload.about)
  ) {
    console.warn(
      "[contact] about check rejected value; retrying with legacy about=enquiry:",
      error.message,
    );
    insert = await withNetworkRetries("contact-legacy", () =>
      supabaseAdmin.from("contact_submissions").insert({
        name: payload.name,
        email: payload.email,
        company: payload.company || null,
        about: "enquiry",
        message: [`About: ${payload.about}`, payload.message]
          .filter(Boolean)
          .join("\n\n"),
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
      "[contact] Supabase unreachable — sending email only so the lead is not lost:",
      error.message,
      error.details,
    );
    try {
      await notifyContactSubmission(emailPayload);
    } catch (emailError) {
      console.error("[contact] email notification failed:", emailError);
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
    return NextResponse.redirect(new URL("/contact?sent=1", req.url), 303);
  }

  if (error) {
    console.error("[contact] supabase insert failed:", error);
    if (wantsJson(req)) {
      return NextResponse.json(
        { ok: false, error: "db_insert_failed", detail: error.message },
        { status: 500 },
      );
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  // Email is best-effort; return as soon as Supabase has the row.
  after(() =>
    notifyContactSubmission(emailPayload).catch((emailError) => {
      console.error("[contact] email notification failed:", emailError);
    }),
  );

  if (wantsJson(req)) {
    return NextResponse.json({ ok: true, persisted: true });
  }
  return NextResponse.redirect(new URL("/contact?sent=1", req.url), 303);
}
