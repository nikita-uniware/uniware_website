/**
 * Ensures all content-model-v3 Technology catalogue names exist in Sanity.
 * Does NOT overwrite existing docs (preserves logos already uploaded).
 * Logos for missing products still need uploading in Studio from official brand kits.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-technology-catalogue.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env vars. Require NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/** From case-study-content-model-v3.md §5 */
const CATALOGUE = [
  "CrowdStrike",
  "Fortinet",
  "Veeam",
  "Dell",
  "AWS",
  "Microsoft 365",
  "Commvault",
  "Nutanix",
  "VMware",
  "Azure",
  "Google Cloud",
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const results = [];

for (const name of CATALOGUE) {
  const slug = slugify(name);
  const id = `technology.${slug}`;

  try {
    const existing = await client.getDocument(id).catch(() => null);
    if (existing) {
      results.push({
        name,
        slug,
        status: "exists",
        hasLogo: Boolean(existing.logo?.asset),
      });
      continue;
    }

    await client.create({
      _id: id,
      _type: "technology",
      name,
      slug: { _type: "slug", current: slug },
    });
    results.push({ name, slug, status: "created", hasLogo: false });
  } catch (error) {
    results.push({
      name,
      slug,
      status: "failed",
      error: error.message ?? String(error),
    });
  }
}

const needLogo = results.filter((r) => r.status !== "failed" && !r.hasLogo);

console.log(
  JSON.stringify(
    {
      projectId,
      dataset,
      results,
      uploadLogosInStudio: needLogo.map((r) => r.name),
    },
    null,
    2
  )
);
