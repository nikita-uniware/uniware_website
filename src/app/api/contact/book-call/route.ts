import { NextRequest, NextResponse } from "next/server";

function wantsJson(req: NextRequest) {
  return (req.headers.get("accept") ?? "").includes("application/json");
}

/**
 * Booking panel form handler.
 * Native HTML POST → 303 redirect to /contact?booked=1.
 * Fetch with Accept: application/json → { ok: true }.
 *
 * Delivery (email/CRM) to be wired when credentials are available.
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

  console.info("[book-call]", payload);

  if (wantsJson(req)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/contact?booked=1", req.url), 303);
}
