import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

const [caseStudies, technologies, total] = await Promise.all([
  client.fetch(`*[_type=="caseStudy"]{_id,headline,"slug":slug.current}`),
  client.fetch(`*[_type=="technology"]{_id,name}`),
  client.fetch(`count(*)`),
]);

console.log(
  JSON.stringify(
    {
      ok: true,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      totalDocs: total,
      caseStudies,
      technologies,
    },
    null,
    2
  )
);
