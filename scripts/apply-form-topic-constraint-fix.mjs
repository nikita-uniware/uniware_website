/**
 * Apply form-constraint widening migration against the configured Supabase project.
 * Usage: node --env-file=.env.local scripts/apply-form-topic-constraint-fix.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sqlPath = resolve(
  "supabase/migrations/20260915_widen_form_topic_checks.sql",
);
const sql = readFileSync(sqlPath, "utf8")
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .trim();

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const rpcNames = ["exec_sql", "execute_sql", "sql"];

for (const fn of rpcNames) {
  const { data, error } = await sb.rpc(fn, { query: sql });
  if (!error) {
    console.log(`Applied via rpc ${fn}`, data ?? "ok");
    process.exit(0);
  }
  console.log(`rpc ${fn}:`, error.message);
}

console.log(
  "\nNo SQL RPC on this project. Run this file in Supabase → SQL Editor:\n",
);
console.log(sql);
process.exit(2);
