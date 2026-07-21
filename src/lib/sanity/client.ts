import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_READ_TOKEN;

/**
 * Server-side Sanity client for the Uniware website.
 * Uses a read token when present (required if the dataset is private).
 */
export function getSanityClient(): SanityClient | null {
  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !token,
    token: token || undefined,
    perspective: "published",
  });
}

export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}
