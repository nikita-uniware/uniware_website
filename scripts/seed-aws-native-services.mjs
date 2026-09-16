/**
 * Seed AWS Native Service catalogue (icons from public/aws-native-services).
 * Idempotent — updates name/shortLabel/sortOrder/icon on existing docs.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-aws-native-services.mjs
 *
 * Note: Official "AWS Migration Hub" SVG was not in the shared package;
 * we ship Application Migration Service icon under that slug until replaced.
 */
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

const ICONS_DIR = path.resolve("public/aws-native-services");

/** Ordered catalogue — matches Niki’s confirmed Architecture Icon list. */
const CATALOGUE = [
  {
    slug: "amazon-ec2",
    name: "Amazon EC2",
    shortLabel: "EC2",
    file: "amazon-ec2.svg",
    sortOrder: 10,
  },
  {
    slug: "amazon-s3",
    name: "Amazon S3",
    shortLabel: "S3",
    file: "amazon-s3.svg",
    sortOrder: 20,
  },
  {
    slug: "amazon-ebs",
    name: "Amazon EBS",
    shortLabel: "EBS",
    file: "amazon-ebs.svg",
    sortOrder: 30,
  },
  {
    slug: "aws-backup",
    name: "AWS Backup",
    shortLabel: "Backup",
    file: "aws-backup.svg",
    sortOrder: 40,
  },
  {
    slug: "amazon-vpc",
    name: "Amazon VPC",
    shortLabel: "VPC",
    file: "amazon-vpc.svg",
    sortOrder: 50,
  },
  {
    slug: "amazon-cloudfront",
    name: "Amazon CloudFront",
    shortLabel: "CloudFront",
    file: "amazon-cloudfront.svg",
    sortOrder: 60,
  },
  {
    slug: "aws-cloudtrail",
    name: "AWS CloudTrail",
    shortLabel: "CloudTrail",
    file: "aws-cloudtrail.svg",
    sortOrder: 70,
  },
  {
    slug: "amazon-cloudwatch",
    name: "Amazon CloudWatch",
    shortLabel: "CloudWatch",
    file: "amazon-cloudwatch.svg",
    sortOrder: 80,
  },
  {
    slug: "amazon-rds",
    name: "Amazon RDS",
    shortLabel: "RDS",
    file: "amazon-rds.svg",
    sortOrder: 90,
  },
  {
    slug: "amazon-guardduty",
    name: "Amazon GuardDuty",
    shortLabel: "GuardDuty",
    file: "amazon-guardduty.svg",
    sortOrder: 100,
  },
  {
    slug: "aws-iam-identity-center",
    name: "AWS IAM Identity Center",
    shortLabel: "IAM Identity Center",
    file: "aws-iam-identity-center.svg",
    sortOrder: 110,
  },
  {
    slug: "aws-migration-hub",
    name: "AWS Migration Hub",
    shortLabel: "Migration Hub",
    file: "aws-migration-hub.svg",
    sortOrder: 120,
  },
  {
    slug: "amazon-workspaces",
    name: "Amazon WorkSpaces",
    shortLabel: "WorkSpaces",
    file: "amazon-workspaces.svg",
    sortOrder: 130,
  },
  {
    slug: "amazon-bedrock",
    name: "Amazon Bedrock",
    shortLabel: "Bedrock",
    file: "amazon-bedrock.svg",
    sortOrder: 140,
  },
];

function sanitizeSvgForUpload(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return Buffer.from(
    raw
      .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
      .replace(/\sxmlns:[a-z]+="[^"]*"/gi, "")
      .replace(/\sxml:space="preserve"/gi, "")
  );
}

const results = [];

for (const entry of CATALOGUE) {
  const id = `awsNativeService.${entry.slug}`;
  const filePath = path.join(ICONS_DIR, entry.file);

  if (!fs.existsSync(filePath)) {
    results.push({ slug: entry.slug, status: "missing-file", file: entry.file });
    continue;
  }

  try {
    const asset = await client.assets.upload(
      "image",
      sanitizeSvgForUpload(filePath),
      {
        filename: entry.file,
        contentType: "image/svg+xml",
      }
    );

    await client.createOrReplace({
      _id: id,
      _type: "awsNativeService",
      name: entry.name,
      shortLabel: entry.shortLabel,
      slug: { _type: "slug", current: entry.slug },
      sortOrder: entry.sortOrder,
      icon: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    });

    results.push({ slug: entry.slug, status: "upserted", name: entry.name });
  } catch (error) {
    results.push({
      slug: entry.slug,
      status: "failed",
      error: error.message ?? String(error),
    });
  }
}

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => r.status === "failed" || r.status === "missing-file");
if (failed.length) process.exit(1);
