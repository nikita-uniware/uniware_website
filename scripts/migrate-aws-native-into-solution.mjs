/**
 * Move root-level AWS Native Services fields into solution.*
 * (Schema now keeps them under Solution, after Technologies used.)
 *
 * Usage: node --env-file=.env.local scripts/migrate-aws-native-into-solution.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const docs = await client.fetch(
  `*[_type == "caseStudy" && (defined(showAwsNativeServices) || defined(awsNativeServices))]{
    _id,
    showAwsNativeServices,
    awsNativeServices,
    "solutionHasAws": defined(solution.showAwsNativeServices)
  }`
);

const results = [];

for (const doc of docs) {
  if (doc.solutionHasAws) {
    results.push({ id: doc._id, status: "already-nested" });
    continue;
  }

  const patch = client.patch(doc._id).set({
    "solution.showAwsNativeServices": Boolean(doc.showAwsNativeServices),
    "solution.awsNativeServices": doc.awsNativeServices ?? [],
  }).unset(["showAwsNativeServices", "awsNativeServices"]);

  try {
    await patch.commit({ autoGenerateArrayKeys: true });
    results.push({ id: doc._id, status: "migrated" });
  } catch (error) {
    results.push({
      id: doc._id,
      status: "failed",
      error: error.message ?? String(error),
    });
  }
}

console.log(JSON.stringify(results, null, 2));
