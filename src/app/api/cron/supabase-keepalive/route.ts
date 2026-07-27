import { NextResponse } from "next/server";
import {
  CONTACT_SUBMISSIONS_TABLE,
  createSupabaseAdmin,
} from "@/lib/supabase/server";

/**
 * Daily Supabase keep-alive (Vercel Cron).
 * Prevents free-tier pause from inactivity via a lightweight SELECT.
 *
 * Auth: Authorization: Bearer ${CRON_SECRET}
 * Schedule: 0 0 * * * (every day 00:00 UTC) — see vercel.json
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Server database configuration is missing." },
      { status: 500 },
    );
  }

  try {
    const { error } = await supabase
      .from(CONTACT_SUBMISSIONS_TABLE)
      .select("id", { count: "exact", head: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Supabase kept alive" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
