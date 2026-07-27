/**
 * Backfill Technology.pages so existing logos keep appearing on cybersecurity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/backfill-technology-pages.mjs
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

const PAGE = "cybersecurity";

const docs = await client.fetch(
  `*[_type == "technology"]{ _id, name, pages }`
);

const results = [];

for (const doc of docs) {
  const pages = Array.isArray(doc.pages) ? doc.pages : [];
  if (pages.includes(PAGE)) {
    results.push({ id: doc._id, name: doc.name, status: "already-set" });
    continue;
  }

  await client
    .patch(doc._id)
    .set({ pages: [...pages, PAGE] })
    .commit();

  results.push({ id: doc._id, name: doc.name, status: "updated" });
}

console.log(
  JSON.stringify(
    {
      page: PAGE,
      total: docs.length,
      updated: results.filter((r) => r.status === "updated").length,
      alreadySet: results.filter((r) => r.status === "already-set").length,
      results,
    },
    null,
    2
  )
);
