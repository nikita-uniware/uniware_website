import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

function wantsJson(req: NextRequest) {
  return (req.headers.get("accept") ?? "").includes("application/json");
}

/**
 * Contact form handler.
 * Native HTML POST → 303 redirect to /contact?sent=1.
 * Fetch with Accept: application/json → { ok: true }.
 *
 * Delivery (email/CRM) to be wired when credentials are available.
 */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const payload = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    company: String(form.get("company") ?? "").trim(),
    about: String(form.get("about") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.about || !payload.message) {
    if (wantsJson(req)) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  const { error } = await supabaseAdmin.from("contact_submissions").insert({
    name: payload.name,
    email: payload.email,
    company: payload.company || null,
    about: payload.about,
    message: payload.message,
  });

  if (error) {
    console.error("[contact] supabase insert failed:", error);
    if (wantsJson(req)) {
      return NextResponse.json({ ok: false, error: "db_insert_failed" }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/contact", req.url), 303);
  }

  if (wantsJson(req)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/contact?sent=1", req.url), 303);
}
