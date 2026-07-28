/**
 * Add a CORS origin for embedded Studio (browser auth needs credentials).
 * Usage: node --env-file=.env.local scripts/add-cors-origin.mjs http://localhost:5000
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ubaw4uif";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

const origin = process.argv[2];
if (!origin) {
  console.error("Usage: node --env-file=.env.local scripts/add-cors-origin.mjs <origin>");
  console.error("Example: node --env-file=.env.local scripts/add-cors-origin.mjs http://localhost:5000");
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (or SANITY_AUTH_TOKEN) in .env.local");
  process.exit(1);
}

const apiVersion = "v2021-06-07";
const listUrl = `https://api.sanity.io/${apiVersion}/projects/${projectId}/cors`;

const listRes = await fetch(listUrl, {
  headers: { Authorization: `Bearer ${token}` },
});

if (!listRes.ok) {
  console.error("Failed to list CORS origins:", listRes.status, await listRes.text());
  process.exit(1);
}

const existing = await listRes.json();
const found = existing.find((e) => e.origin === origin);

if (found) {
  console.log(
    JSON.stringify(
      {
        ok: true,
        action: "already_exists",
        origin,
        allowCredentials: found.allowCredentials,
      },
      null,
      2
    )
  );
  process.exit(0);
}

const createRes = await fetch(listUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    origin,
    allowCredentials: true,
  }),
});

const body = await createRes.text();
if (!createRes.ok) {
  console.error("Failed to add CORS origin:", createRes.status, body);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      action: "created",
      origin,
      allowCredentials: true,
      response: JSON.parse(body),
    },
    null,
    2
  )
);
