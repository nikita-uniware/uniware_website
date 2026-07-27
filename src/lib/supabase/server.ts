import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Real Uniware lead tables — used by forms and the keepalive cron. */
export const CONTACT_SUBMISSIONS_TABLE = "contact_submissions";
export const BOOKING_REQUESTS_TABLE = "booking_requests";

function normalizeSupabaseUrl(raw: string) {
  const trimmed = raw.trim().replace(/\/+$/, "");
  return trimmed.replace(/\/rest\/v1$/i, "");
}

function resolveSupabaseUrl(): string | null {
  const direct =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.PROJECT_URL?.trim();

  if (direct) return normalizeSupabaseUrl(direct);

  const projectId = process.env.PROJECT_ID?.trim();
  if (projectId) return `https://${projectId}.supabase.co`;

  return null;
}

/**
 * Server-only admin client.
 * Returns null when URL/key are missing (cron can return 500 cleanly).
 */
export function createSupabaseAdmin(): SupabaseClient | null {
  const supabaseUrl = resolveSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) return null;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Required admin client for form API routes.
 * Throws if Supabase env is not configured.
 */
export function requireSupabaseAdmin(): SupabaseClient {
  const client = createSupabaseAdmin();
  if (!client) {
    throw new Error(
      "Missing Supabase env vars: SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  return client;
}

/** @deprecated Prefer requireSupabaseAdmin() / createSupabaseAdmin(). */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = requireSupabaseAdmin();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
