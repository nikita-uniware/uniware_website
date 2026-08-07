/**
 * Set industry on the two published case studies.
 * Usage: node --env-file=.env.local scripts/set-case-study-industries.mjs
 */
import { createClient } from "@sanity/client";

const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (or SANITY_AUTH_TOKEN)");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ubaw4uif",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn: false,
});

const UPDATES = [
  {
    slug: "ransomware-recovery-chemical-manufacturing",
    industry: "Manufacturing",
  },
  {
    slug: "ransomware-recovery-vpn-vulnerability",
    industry: "IT & Technology Services",
  },
];

for (const { slug, industry } of UPDATES) {
  const id = await client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0]._id`,
    { slug }
  );
  if (!id) {
    console.error(`Not found: ${slug}`);
    continue;
  }
  await client.patch(id).set({ industry }).commit();
  console.log(`Set ${slug} → ${industry} (${id})`);
}

console.log("Done.");
