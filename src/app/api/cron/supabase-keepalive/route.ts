import { NextResponse } from "next/server";
import {
  CONTACT_SUBMISSIONS_TABLE,
  createSupabaseAdmin,
} from "@/lib/supabase/server";

/**
 * Daily Supabase keep-alive (Vercel Cron).
 * Free-tier pause heuristics look at weekly DB activity volume, not just
 * “did one request succeed?” — so each run issues three lightweight reads.
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
    const table = CONTACT_SUBMISSIONS_TABLE;

    // 1) Exact count (HEAD)
    const countRes = await supabase
      .from(table)
      .select("id", { count: "exact", head: true });
    if (countRes.error) {
      return NextResponse.json(
        { ok: false, error: countRes.error.message, step: "count" },
        { status: 500 },
      );
    }

    // 2) Sample one row
    const sampleRes = await supabase.from(table).select("id").limit(1);
    if (sampleRes.error) {
      return NextResponse.json(
        { ok: false, error: sampleRes.error.message, step: "sample" },
        { status: 500 },
      );
    }

    // 3) Latest created_at (falls back to id-only order if column missing)
    let latestCreatedAt: string | null = null;
    const latestRes = await supabase
      .from(table)
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestRes.error) {
      const fallback = await supabase
        .from(table)
        .select("id")
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (fallback.error) {
        return NextResponse.json(
          { ok: false, error: fallback.error.message, step: "latest" },
          { status: 500 },
        );
      }
    } else {
      latestCreatedAt =
        (latestRes.data as { created_at?: string | null } | null)?.created_at ??
        null;
    }

    return NextResponse.json({
      ok: true,
      message: "Supabase kept alive",
      queries: 3,
      count: countRes.count ?? 0,
      sampleId: sampleRes.data?.[0]?.id ?? null,
      latestCreatedAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
