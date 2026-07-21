import fs from "node:fs";
import path from "node:path";
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

const logoToName = {
  "logo-1.svg": "Fortinet",
  "logo-2.svg": "CrowdStrike",
  "logo-3.svg": "Sophos",
  "logo-4.svg": "Netskope",
  "logo-5.svg": "Tenable",
  "logo-6.svg": "Versa",
  "logo-7.svg": "Armis",
  "logo-8.svg": "F5",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sanitizeSvgForUpload(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return Buffer.from(
    raw
      .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
      .replace(/\sxmlns:[a-z]+="[^"]*"/gi, "")
      .replace(/\sxml:space="preserve"/gi, "")
  );
}

function prepareImageUpload(filePath, file) {
  const raw = fs.readFileSync(filePath, "utf8");
  const dataUriMatch = raw.match(
    /(?:xlink:)?href="data:image\/(png|jpe?g|webp);base64,([^"]+)"/i
  );

  if (dataUriMatch) {
    const ext = dataUriMatch[1].replace("jpeg", "jpg");
    return {
      body: Buffer.from(dataUriMatch[2], "base64"),
      filename: file.replace(/\.svg$/i, `.${ext}`),
      contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
    };
  }

  return {
    body: sanitizeSvgForUpload(filePath),
    filename: file,
    contentType: "image/svg+xml",
  };
}

const partnersDir = path.resolve("public/partners");
const files = fs
  .readdirSync(partnersDir)
  .filter((f) => f.toLowerCase().endsWith(".svg"))
  .sort();

if (files.length === 0) {
  console.log("No partner logos found in public/partners.");
  process.exit(0);
}

const results = [];

for (const file of files) {
  const name = logoToName[file];
  if (!name) {
    results.push({ file, status: "skipped", reason: "no mapping" });
    continue;
  }

  try {
    const filePath = path.join(partnersDir, file);
    const { body, filename, contentType } = prepareImageUpload(filePath, file);
    const asset = await client.assets.upload("image", body, {
      filename,
      contentType,
    });

    const slug = slugify(name);
    const doc = {
      _id: `technology.${slug}`,
      _type: "technology",
      name,
      slug: { _type: "slug", current: slug },
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    };

    await client.createOrReplace(doc);
    results.push({ file, status: "upserted", name, slug });
  } catch (error) {
    results.push({
      file,
      status: "failed",
      name,
      error: error.message ?? String(error),
    });
  }
}

const expected = Object.keys(logoToName);
const missing = expected.filter((f) => !files.includes(f));

console.log(
  JSON.stringify(
    {
      projectId,
      dataset,
      foundFiles: files,
      missingExpectedFiles: missing,
      results,
    },
    null,
    2
  )
);
