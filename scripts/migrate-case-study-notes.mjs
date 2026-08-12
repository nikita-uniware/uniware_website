import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN or SANITY_AUTH_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ubaw4uif",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn: false,
});

const slugs = [
  "ransomware-recovery-chemical-manufacturing",
  "ransomware-recovery-vpn-vulnerability",
];

for (const slug of slugs) {
  const ids = await client.fetch(`*[_type == "caseStudy" && slug.current == $slug]._id`, { slug });
  for (const id of ids ?? []) {
    const patch = client.patch(id)
      .setIfMissing({ noteAfterResults: { show: false, quotes: [] } });

    const doc = await client.fetch(`*[_id == $id][0]{showNote,note,noteAfterResults}`, { id });
    const hasLegacy = Boolean(doc?.showNote && doc?.note?.name);
    const alreadyMigrated = Boolean(doc?.noteAfterResults?.quotes?.length);

    if (hasLegacy && !alreadyMigrated) {
      patch
        .set({
          noteAfterResults: {
            show: true,
            quotes: [doc.note],
          },
        })
        .unset(["showNote", "note"]);
    } else {
      patch.unset(["showNote", "note"]);
    }

    await patch.commit();
    console.log(`Updated ${id}`);
  }
}

console.log("Done");
