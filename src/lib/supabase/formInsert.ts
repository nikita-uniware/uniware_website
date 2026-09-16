/** Classify / retry helpers for Supabase form inserts. */

export function isNetworkDbError(
  error: { message?: string; details?: string; code?: string } | null | undefined,
) {
  if (!error) return false;
  const blob = `${error.message ?? ""} ${error.details ?? ""} ${error.code ?? ""}`.toLowerCase();
  return (
    blob.includes("fetch failed") ||
    blob.includes("econnreset") ||
    blob.includes("econnrefused") ||
    blob.includes("etimedout") ||
    blob.includes("network") ||
    blob.includes("socket") ||
    blob.includes("tls")
  );
}

export function isCheckConstraintError(
  error: { code?: string; message?: string } | null | undefined,
) {
  if (!error) return false;
  if (error.code === "23514") return true;
  const msg = (error.message ?? "").toLowerCase();
  return msg.includes("check") || msg.includes("violates");
}

/**
 * Retry a Supabase insert a few times on transient network failures
 * (common on flaky local links; does not help if the host is fully blocked).
 */
export async function withNetworkRetries<T extends { error: unknown }>(
  label: string,
  run: () => PromiseLike<T>,
  attempts = 2,
): Promise<T> {
  let last: T | undefined;
  for (let i = 1; i <= attempts; i++) {
    last = await run();
    const err = last.error as { message?: string; details?: string } | null;
    if (!err) return last;
    if (!isNetworkDbError(err) || i === attempts) return last;
    console.warn(
      `[${label}] network error on attempt ${i}/${attempts}, retrying…`,
      err.message,
    );
    await new Promise((r) => setTimeout(r, 250 * i));
  }
  return last as T;
}
