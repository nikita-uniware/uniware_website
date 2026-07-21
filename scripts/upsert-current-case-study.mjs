import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env vars. Require NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (or SANITY_AUTH_TOKEN)."
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

const chemicalManufacturingCaseStudy = {
  slug: "ransomware-recovery-chemical-manufacturing",
  categoryTags: ["Cybersecurity", "Data Protection", "Infrastructure"],
  headline:
    "Test headline: Ransomware recovery for a five-division manufacturing business, in 72 hours.",
  subtext:
    "A 300-person chemical manufacturing business with five divisions across Tamil Nadu. No ransom paid. No repeat incidents since.",
  stats: [
    { number: "72 Hrs", label: "Full rebuild" },
    { number: "5", label: "Divisions restored" },
    { number: "300+", label: "Staff back online" },
    { number: "Zero", label: "Ransom paid" },
  ],
  overview: {
    heading: "Chemical Manufacturing",
    description:
      "A 300-person chemical manufacturing business with five divisions across Tamil Nadu.",
    location: "Chennai, India",
    timeline: "72 hours, emergency response",
    deliveredBy: "Uniware Systems",
    technologies: [
      { name: "CrowdStrike", type: "Falcon EDR" },
      { name: "Fortinet", type: "Firewall" },
      { name: "Veeam", type: "Backup" },
    ],
  },
  problem: {
    heading: "A single server failure turned out to be the entire business.",
    body: [
      "Within hours, staff across all five divisions could not access files, applications, or any business system. The team initially thought one server had failed. Every server across every division had in fact been encrypted overnight, along with the laptops of finance and management staff.",
      "There was no firewall at any location, no multi-factor authentication, and antivirus software that had been disabled by the attacker using standard Windows tools. **The attacker had been inside the network for roughly 14 hours before the ransomware ran.**",
      "The only surviving restore point was a backup taken months earlier by a third-party software vendor during a routine upgrade.",
    ],
  },
  solution: {
    heading: "A complete rebuild, from zero to fully protected.",
    body: "Uniware's team followed the NIST Cybersecurity Framework end to end, giving the recovery a documented, auditable structure. **This project took five stages. Others may take three, or six, depending on scope.**",
    showSteps: true,
    steps: [
      {
        title: "Identify",
        body: "CrowdStrike deployed immediately across every reachable system, giving the team endpoint protection and the business's first complete device list at the same time.",
      },
      {
        title: "Protect",
        body: "Fortinet firewalls installed at every location. Secure VPN with MFA replaced exposed remote desktop access. Active Directory rebuilt from scratch with hardened policies.",
      },
      {
        title: "Detect",
        body: "Tamper-proof activity logging and automated alerts configured for suspicious behaviour going forward.",
      },
      {
        title: "Respond",
        body: "Compromised accounts disabled, passwords reset business-wide, forensic evidence preserved on original drives.",
      },
      {
        title: "Recover",
        body: "Servers rebuilt on clean hardware. Data restored from the last available backup, with the remaining gap re-entered by all 300 staff within two days.",
      },
    ],
    showTechnologies: true,
    technologies: [
      { name: "CrowdStrike", type: "Falcon EDR" },
      { name: "Fortinet", type: "Firewall" },
      { name: "Veeam", type: "Backup" },
    ],
  },
  beforeAfter: {
    heading: "Read row by row, what actually changed.",
    rows: [
      {
        metric: "Firewall",
        before: "None at any location",
        after: "Fortinet with IPS at every location",
      },
      {
        metric: "Remote access",
        before: "Exposed, no MFA",
        after: "Secure VPN with MFA",
      },
      {
        metric: "Endpoint protection",
        before: "Basic antivirus, disabled by attacker",
        after: "CrowdStrike on all servers and workstations",
      },
      {
        metric: "Backups",
        before: "On the same server, plus a connected USB drive",
        after: "Veeam Backup + rotational offline drives",
      },
      {
        metric: "User accounts",
        before: "Weak passwords, no MFA, no lockout",
        after: "Strong passwords, MFA, lockout policies",
      },
      { metric: "Asset inventory", before: "None", after: "Full device inventory" },
      {
        metric: "Incident response plan",
        before: "None in place",
        after: "Documented playbook delivered",
      },
    ],
  },
  results: {
    heading: "What changed, in practice.",
    outcomes: [
      "Zero repeat incidents since the recovery",
      "Full device inventory created for the first time",
      "Documented incident response playbook now in place",
      "Layered backup strategy protects against future attacks",
    ],
  },
  note: {
    source: "team",
    quote:
      "If a client calls over the weekend, it is almost always ransomware. We went immediately, and the whole team rallied, including all 300 staff who helped re-enter two days of missing data by hand.",
    name: "Dhanasekar",
    designation: "Chief Technology Officer",
    company: "Uniware Systems",
  },
  whatsNext:
    "Phase 2 is underway: long-term backup retention is moving to the cloud, layered on top of the fast local recovery already in place.",
  seo: {
    title: "Ransomware Recovery in 72 Hours | Chemical Manufacturing",
    description:
      "How Uniware Systems rebuilt a 300-person manufacturing business's entire IT environment in 72 hours after a LockBit ransomware attack. No ransom paid.",
  },
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function key(prefix, idx) {
  return `${prefix}-${idx + 1}`;
}

function plainToPortable(text) {
  return [
    {
      _type: "block",
      _key: "block-1",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "span-1", text, marks: [] }],
    },
  ];
}

function markdownBoldToPortable(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return [
    {
      _type: "block",
      _key: "block-1",
      style: "normal",
      markDefs: [],
      children: parts.map((part, idx) => {
        const isBold = part.startsWith("**") && part.endsWith("**");
        return {
          _type: "span",
          _key: `span-${idx + 1}`,
          text: isBold ? part.slice(2, -2) : part,
          marks: isBold ? ["strong"] : [],
        };
      }),
    },
  ];
}

function markdownParagraphsToPortable(paragraphs) {
  return paragraphs.map((p, idx) => {
    const parts = p.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return {
      _type: "block",
      _key: `block-${idx + 1}`,
      style: "normal",
      markDefs: [],
      children: parts.map((part, partIdx) => {
        const isBold = part.startsWith("**") && part.endsWith("**");
        return {
          _type: "span",
          _key: `span-${idx + 1}-${partIdx + 1}`,
          text: isBold ? part.slice(2, -2) : part,
          marks: isBold ? ["strong"] : [],
        };
      }),
    };
  });
}

async function ensureTechnologyRef(name) {
  const slug = slugify(name);
  const existing = await client.fetch(
    `*[_type == "technology" && (name == $name || slug.current == $slug)][0]{_id}`,
    { name, slug }
  );

  if (existing?._id) return existing._id;

  const created = await client.createIfNotExists({
    _id: `technology.${slug}`,
    _type: "technology",
    name,
    slug: { _type: "slug", current: slug },
  });

  return created._id;
}

async function mapTechnologyArray(technologies, prefix) {
  const out = [];
  for (let idx = 0; idx < technologies.length; idx += 1) {
    const tech = technologies[idx];
    const techId = await ensureTechnologyRef(tech.name);
    out.push({
      _type: "object",
      _key: key(prefix, idx),
      technology: { _type: "reference", _ref: techId },
      ...(tech.type ? { type: tech.type } : {}),
    });
  }
  return out;
}

async function run() {
  const source = chemicalManufacturingCaseStudy;
  const slug = source.slug;

  const overviewTech = await mapTechnologyArray(
    source.overview.technologies,
    "overview-tech"
  );
  const solutionTech = await mapTechnologyArray(
    source.solution.technologies,
    "solution-tech"
  );

  const doc = {
    _id: `caseStudy.${slug}`,
    _type: "caseStudy",
    categoryTags: source.categoryTags,
    headline: source.headline,
    subtext: markdownBoldToPortable(source.subtext),
    stats: source.stats.map((s, idx) => ({
      _type: "object",
      _key: key("stat", idx),
      number: s.number,
      label: s.label,
    })),
    overview: {
      heading: source.overview.heading,
      description: markdownBoldToPortable(source.overview.description),
      location: source.overview.location,
      timeline: source.overview.timeline || "",
      deliveredBy: source.overview.deliveredBy,
      technologies: overviewTech,
    },
    problem: {
      heading: source.problem.heading,
      body: markdownParagraphsToPortable(source.problem.body),
    },
    solution: {
      heading: source.solution.heading,
      body: markdownBoldToPortable(source.solution.body),
      showSteps: source.solution.showSteps,
      steps: source.solution.steps.map((step, idx) => ({
        _type: "object",
        _key: key("step", idx),
        title: step.title,
        body: step.body,
      })),
      showTechnologies: source.solution.showTechnologies,
      technologies: solutionTech,
    },
    beforeAfter: {
      heading: source.beforeAfter.heading,
      rows: source.beforeAfter.rows.map((row, idx) => ({
        _type: "object",
        _key: key("row", idx),
        metric: row.metric,
        before: row.before,
        after: row.after,
      })),
    },
    results: {
      heading: source.results.heading,
      outcomes: source.results.outcomes.map((item, idx) => ({
        _type: "string",
        _key: key("outcome", idx),
        value: item,
      })),
    },
    showNote: Boolean(source.note),
    note: source.note
      ? {
          source: source.note.source,
          quote: plainToPortable(source.note.quote),
          name: source.note.name,
          designation: source.note.designation,
          company: source.note.company,
        }
      : undefined,
    whatsNext: source.whatsNext || "",
    seoTitle: source.seo.title,
    metaDescription: source.seo.description,
    slug: { _type: "slug", current: slug },
  };

  // results.outcomes is an array of strings in schema
  doc.results.outcomes = source.results.outcomes;

  await client.createOrReplace(doc);

  const published = await client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0]{_id, headline, "slug": slug.current}`,
    { slug }
  );

  console.log(
    JSON.stringify(
      {
        status: "ok",
        projectId,
        dataset,
        caseStudyId: doc._id,
        published,
      },
      null,
      2
    )
  );
}

run().catch((error) => {
  console.error("Failed to upsert case study:", error?.message || error);
  process.exit(1);
});
