/**
 * Sanity schema definitions for the Uniware website.
 * Used by Studio (`sanity.config.ts`) and documented in content model v3.
 *
 * Source: case-study-content-model-v3.md
 * Handoff: sanity/SANITY_CASE_STUDY_SCHEMA.md
 */

type PortableChild = { text?: string };
type PortableBlock = { children?: PortableChild[] };

/** Plain-text length of bold-only portable text (for max-char validation). */
function portableTextLength(blocks: PortableBlock[] | undefined) {
  if (!Array.isArray(blocks)) return 0;
  return blocks
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .join("")
    .trim().length;
}

const boldOnlyBlock = {
  type: "block",
  styles: [],
  lists: [],
  marks: {
    decorators: [{ title: "Bold", value: "strong" }],
    annotations: [],
  },
};

const noteQuoteFields = [
  {
    name: "source",
    title: "Source",
    type: "string",
    options: {
      list: [
        { title: "A note from our client", value: "client" },
        { title: "A note from our team", value: "team" },
      ],
    },
    validation: (Rule: { required: () => unknown }) => Rule.required(),
  },
  {
    name: "quote",
    title: "Quote text",
    type: "array",
    of: [boldOnlyBlock],
    description: "Keep to 2–3 sentences. Max ~300 characters.",
    validation: (Rule: {
      required: () => {
        custom: (
          fn: (value: PortableBlock[] | undefined) => true | string
        ) => unknown;
      };
    }) =>
      Rule.required().custom((value: PortableBlock[] | undefined) => {
        const len = portableTextLength(value);
        if (len === 0) return "Quote is required";
        if (len > 300) return `Keep under 300 characters (currently ${len})`;
        return true;
      }),
  },
  {
    name: "name",
    title: "Name",
    type: "string",
    validation: (Rule: { required: () => unknown }) => Rule.required(),
  },
  {
    name: "designation",
    title: "Designation",
    type: "string",
    validation: (Rule: { required: () => unknown }) => Rule.required(),
  },
  {
    name: "company",
    title: "Company",
    type: "string",
    validation: (Rule: { required: () => unknown }) => Rule.required(),
  },
];

function noteSlotField(name: string, title: string, description: string) {
  return {
    name,
    title,
    type: "object",
    group: "content",
    fields: [
      {
        name: "show",
        title: "Show this note",
        type: "boolean",
        initialValue: false,
        description:
          "Off by default. Switch on only if you have a quote or comment for this position.",
      },
      {
        name: "quotes",
        title: "Quotes",
        type: "array",
        hidden: ({ parent }: { parent?: { show?: boolean } }) => !parent?.show,
        description: "Add one or more quotes. Drag to reorder.",
        validation: (Rule: {
          custom: (
            fn: (
              value: unknown,
              context: { parent?: { show?: boolean } }
            ) => true | string
          ) => unknown;
        }) =>
          Rule.custom(
            (quotes: unknown, context: { parent?: { show?: boolean } }) => {
              if (!context.parent?.show) return true;
              if (!Array.isArray(quotes) || quotes.length < 1) {
                return "Add at least one quote when this note is shown";
              }
              return true;
            }
          ),
        of: [
          {
            type: "object",
            fields: noteQuoteFields,
            preview: {
              select: { title: "name", subtitle: "source" },
              prepare: ({
                title,
                subtitle,
              }: {
                title?: string;
                subtitle?: string;
              }) => ({
                title: title || "Untitled quote",
                subtitle:
                  subtitle === "client"
                    ? "A note from our client"
                    : "A note from our team",
              }),
            },
          },
        ],
      },
    ],
    description,
  };
}

const CATEGORY_TAGS = [
  { title: "Cloud", value: "Cloud" },
  { title: "Cybersecurity", value: "Cybersecurity" },
  { title: "Modern Workplace", value: "Modern Workplace" },
  { title: "Data Protection", value: "Data Protection" },
  { title: "AI & Automation", value: "AI & Automation" },
  { title: "Infrastructure", value: "Infrastructure" },
];

/** Internal taxonomy for filtering/reporting — not rendered on the site yet. */
const INDUSTRIES = [
  { title: "Manufacturing", value: "Manufacturing" },
  { title: "BFSI", value: "BFSI" },
  { title: "Healthcare", value: "Healthcare" },
  { title: "Education", value: "Education" },
  { title: "Real Estate", value: "Real Estate" },
  { title: "Media & Entertainment", value: "Media & Entertainment" },
  { title: "Public Sector", value: "Public Sector" },
  { title: "IT & Technology Services", value: "IT & Technology Services" },
];

const TECHNOLOGY_PAGES = [
  { title: "Cybersecurity", value: "cybersecurity" },
];

export const technology = {
  name: "technology",
  title: "Technology",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
      description: "Official vendor logo from their brand/media kit.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "pages",
      title: "Show on pages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: TECHNOLOGY_PAGES,
        layout: "grid",
      },
      description:
        "Tick the pages where this logo should appear. Leave all unticked to hide it everywhere without deleting. Only these options are allowed — do not type custom names.",
      initialValue: ["cybersecurity"],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "pages" },
    prepare: ({
      title,
      subtitle,
    }: {
      title?: string;
      subtitle?: string[];
    }) => ({
      title: title || "Untitled technology",
      subtitle:
        Array.isArray(subtitle) && subtitle.length > 0
          ? `Pages: ${subtitle.join(", ")}`
          : "Pages: none selected",
    }),
  },
};

export const caseStudy = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    {
      name: "categoryTags",
      title: "Category tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { list: CATEGORY_TAGS },
      description:
        "Choose up to 3. Can't see the right one? Ask Nikita to add it, don't force-fit an existing tag.",
      validation: (Rule: {
        required: () => { min: (n: number) => { max: (n: number) => unknown } };
      }) => Rule.required().min(1).max(3),
    },
    {
      name: "industry",
      title: "Industry",
      type: "string",
      group: "content",
      options: {
        list: INDUSTRIES,
        layout: "dropdown",
      },
      description:
        "Required. Internal only for now — used for filtering and reporting later. Not shown on the live page yet.",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "headline",
      title: "Headline",
      type: "string",
      group: "content",
      description:
        "One sentence, the outcome of the story. e.g. 'Ransomware recovery for a five-division manufacturing business, in 72 hours.'",
      validation: (Rule: {
        required: () => { max: (n: number) => unknown };
      }) => Rule.required().max(100),
    },
    {
      name: "subtext",
      title: "Subtext",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: "Bold", value: "strong" }],
            annotations: [],
          },
        },
      ],
      description:
        "1–2 sentences. This is the anonymized description of the client, confirmed with them, never their real name.",
      validation: (Rule: {
        required: () => {
          custom: (
            fn: (
              value: PortableBlock[] | undefined
            ) => true | string
          ) => unknown;
        };
      }) =>
        Rule.required().custom((value: PortableBlock[] | undefined) => {
          const len = portableTextLength(value);
          if (len === 0) return "Required";
          if (len > 220) return `Keep under 220 characters (currently ${len})`;
          return true;
        }),
    },
    {
      name: "stats",
      title: "Stats",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "number",
              title: "Number",
              type: "string",
              description: 'Short text, e.g. "72 Hrs", "5", "Zero"',
            },
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "One line, no full stop.",
            },
          ],
          preview: {
            select: { title: "number", subtitle: "label" },
          },
        },
      ],
      description:
        "Min 3, max 4. Grid columns are driven by stats.length (--stat-cols).",
      validation: (Rule: {
        required: () => { min: (n: number) => { max: (n: number) => unknown } };
      }) => Rule.required().min(3).max(4),
    },
    {
      name: "thumbnailIconOverride",
      title: "Thumbnail icon override",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "(Auto — hash from slug)", value: "" },
          { title: "ShieldCheck", value: "ShieldCheck" },
          { title: "Lock", value: "Lock" },
          { title: "LockKey", value: "LockKey" },
          { title: "Vault", value: "Vault" },
          { title: "ShieldWarning", value: "ShieldWarning" },
          { title: "Detective", value: "Detective" },
          { title: "Eye", value: "Eye" },
          { title: "Fingerprint", value: "Fingerprint" },
          { title: "Key", value: "Key" },
          { title: "HardDrives", value: "HardDrives" },
          { title: "Database", value: "Database" },
          { title: "Server", value: "Server" },
          { title: "Desktop", value: "Desktop" },
          { title: "Cloud", value: "Cloud" },
          { title: "CloudArrowUp", value: "CloudArrowUp" },
          { title: "Network", value: "Network" },
          { title: "WifiHigh", value: "WifiHigh" },
          { title: "Router", value: "Router" },
          { title: "ChartBar", value: "ChartBar" },
          { title: "ChartLineUp", value: "ChartLineUp" },
          { title: "Graph", value: "Graph" },
          { title: "BracketsAngle", value: "BracketsAngle" },
          { title: "Code", value: "Code" },
          { title: "Brain", value: "Brain" },
          { title: "Cpu", value: "Cpu" },
          { title: "Robot", value: "Robot" },
          { title: "MagnifyingGlass", value: "MagnifyingGlass" },
          { title: "Buildings", value: "Buildings" },
          { title: "Briefcase", value: "Briefcase" },
          { title: "Factory", value: "Factory" },
          { title: "Wrench", value: "Wrench" },
          { title: "Gear", value: "Gear" },
          { title: "Stack", value: "Stack" },
          { title: "ArrowsClockwise", value: "ArrowsClockwise" },
          { title: "Lightning", value: "Lightning" },
          { title: "BuildingsOffice", value: "BuildingsOffice" },
          { title: "Blueprint", value: "Blueprint" },
        ],
        layout: "dropdown",
      },
      description:
        "Optional. When set, the case study card and share preview use this Phosphor icon (duotone) instead of the hash-based auto-pick. Leave empty for auto.",
    },
    {
      name: "overview",
      title: "Client overview",
      type: "object",
      group: "content",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          description:
            "Short label for the client, e.g. 'Chemical Manufacturing.'",
          validation: (Rule: {
            required: () => { max: (n: number) => unknown };
          }) => Rule.required().max(40),
        },
        {
          name: "description",
          title: "Description",
          type: "array",
          of: [
            {
              type: "block",
              styles: [],
              lists: [],
              marks: {
                decorators: [{ title: "Bold", value: "strong" }],
                annotations: [],
              },
            },
          ],
          description:
            "1 sentence describing who they are — can repeat the hero subtext if that already says it well.",
          validation: (Rule: {
            required: () => {
              custom: (
                fn: (
                  value: PortableBlock[] | undefined
                ) => true | string
              ) => unknown;
            };
          }) =>
            Rule.required().custom((value: PortableBlock[] | undefined) => {
              const len = portableTextLength(value);
              if (len === 0) return "Required";
              if (len > 200) return `Keep under 200 characters (currently ${len})`;
              return true;
            }),
        },
        {
          name: "location",
          title: "Location",
          type: "string",
          description:
            "Country is required. Add a city if you have one: 'Chennai, India.'",
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
          name: "timeline",
          title: "Timeline",
          type: "string",
          description:
            "Optional. Leave blank if there isn't a clean timeframe.",
        },
        {
          name: "deliveredBy",
          title: "Delivered by",
          type: "string",
          initialValue: "Uniware Systems",
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
      ],
    },
    {
      name: "problem",
      title: "Problem",
      type: "object",
      group: "content",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (Rule: {
            required: () => { max: (n: number) => unknown };
          }) => Rule.required().max(100),
        },
        {
          name: "body",
          title: "Body",
          type: "array",
          of: [
            {
              type: "block",
              styles: [],
              lists: [],
              marks: {
                decorators: [{ title: "Bold", value: "strong" }],
                annotations: [],
              },
            },
          ],
          description: "1–3 paragraphs. Bold one detail per paragraph max.",
          validation: (Rule: {
            required: () => {
              custom: (
                fn: (
                  value: PortableBlock[] | undefined
                ) => true | string
              ) => unknown;
            };
          }) =>
            Rule.required().custom((value: PortableBlock[] | undefined) => {
              if (!Array.isArray(value) || value.length === 0) {
                return "Add 1–3 paragraphs";
              }
              if (value.length > 3) return "Use at most 3 paragraphs";
              for (const block of value) {
                const len = (block.children ?? [])
                  .map((c) => c.text ?? "")
                  .join("").length;
                if (len > 500) {
                  return `Each paragraph must be under 500 characters (found ${len})`;
                }
              }
              return true;
            }),
        },
      ],
    },
    {
      name: "solution",
      title: "Solution",
      type: "object",
      group: "content",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (Rule: {
            required: () => { max: (n: number) => unknown };
          }) => Rule.required().max(100),
        },
        {
          name: "body",
          title: "Body",
          type: "array",
          of: [
            {
              type: "block",
              styles: [],
              lists: [],
              marks: {
                decorators: [{ title: "Bold", value: "strong" }],
                annotations: [],
              },
            },
          ],
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
          name: "contentBlocks",
          title: "Content blocks",
          type: "array",
          description:
            "Optional. Add text, image, or video in any order. Drag to reorder. Hosting for video can be upgraded later — upload an MP4 for now.",
          of: [
            {
              type: "object",
              name: "solutionText",
              title: "Text",
              fields: [
                {
                  name: "body",
                  title: "Body",
                  type: "array",
                  of: [boldOnlyBlock],
                  validation: (Rule: { required: () => unknown }) =>
                    Rule.required(),
                },
              ],
              preview: {
                select: { body: "body" },
                prepare: ({ body }: { body?: PortableBlock[] }) => ({
                  title: "Text",
                  subtitle:
                    (body ?? [])
                      .map((b) =>
                        (b.children ?? []).map((c) => c.text ?? "").join("")
                      )
                      .join(" ")
                      .slice(0, 80) || "Empty",
                }),
              },
            },
            {
              type: "object",
              name: "solutionImage",
              title: "Image",
              fields: [
                {
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                  validation: (Rule: { required: () => unknown }) =>
                    Rule.required(),
                },
                {
                  name: "alt",
                  title: "Alt text",
                  type: "string",
                  description: "Describe the image for accessibility.",
                  validation: (Rule: { required: () => unknown }) =>
                    Rule.required(),
                },
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  description: "Optional. Shown under the image.",
                },
              ],
              preview: {
                select: { title: "alt", media: "image" },
              },
            },
            {
              type: "object",
              name: "solutionVideo",
              title: "Video",
              fields: [
                {
                  name: "file",
                  title: "Video file",
                  type: "file",
                  options: { accept: "video/*" },
                  description:
                    "Upload MP4 (H.264) for now. Hosting approach (Mux vs embed) still to be confirmed.",
                  validation: (Rule: { required: () => unknown }) =>
                    Rule.required(),
                },
                {
                  name: "poster",
                  title: "Poster image",
                  type: "image",
                  description: "Optional still shown before play.",
                },
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  description: "Optional. Shown under the video.",
                },
              ],
              preview: {
                select: { title: "caption" },
                prepare: ({ title }: { title?: string }) => ({
                  title: "Video",
                  subtitle: title || "Uploaded file",
                }),
              },
            },
          ],
        },
        {
          name: "showSteps",
          title: "Show steps",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "steps",
          title: "Steps",
          type: "array",
          hidden: ({ parent }: { parent?: { showSteps?: boolean } }) =>
            !parent?.showSteps,
          description:
            "Add stages in order. Drag to reorder. Required when Show steps is on.",
          validation: (Rule: {
            custom: (
              fn: (
                value: unknown,
                context: { parent?: { showSteps?: boolean } }
              ) => true | string
            ) => unknown;
          }) =>
            Rule.custom(
              (
                steps: unknown,
                context: { parent?: { showSteps?: boolean } }
              ) => {
                if (!context.parent?.showSteps) return true;
                if (!Array.isArray(steps) || steps.length < 1) {
                  return "Add at least one step when Show steps is on";
                }
                return true;
              }
            ),
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule: {
                    required: () => { max: (n: number) => unknown };
                  }) => Rule.required().max(30),
                },
                {
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 3,
                  validation: (Rule: {
                    required: () => { max: (n: number) => unknown };
                  }) => Rule.required().max(300),
                },
              ],
              preview: { select: { title: "title", subtitle: "body" } },
            },
          ],
        },
        {
          name: "showTechnologies",
          title: "Show technologies used",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "technologies",
          title: "Technologies used",
          type: "array",
          hidden: ({ parent }: { parent?: { showTechnologies?: boolean } }) =>
            !parent?.showTechnologies,
          description:
            "Single source for both the Solution chips and the sidebar list. Pick from the Technology catalogue. Drag to reorder. Required when Show technologies is on.",
          validation: (Rule: {
            custom: (
              fn: (
                value: unknown,
                context: { parent?: { showTechnologies?: boolean } }
              ) => true | string
            ) => unknown;
          }) =>
            Rule.custom(
              (
                techs: unknown,
                context: { parent?: { showTechnologies?: boolean } }
              ) => {
                if (!context.parent?.showTechnologies) return true;
                if (!Array.isArray(techs) || techs.length < 1) {
                  return "Add at least one technology when Show technologies is on";
                }
                return true;
              }
            ),
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "technology",
                  title: "Technology",
                  type: "reference",
                  to: [{ type: "technology" }],
                  validation: (Rule: { required: () => unknown }) =>
                    Rule.required(),
                },
                {
                  name: "type",
                  title: "Type",
                  type: "string",
                  description:
                    'Optional qualifier, e.g. "Falcon EDR", "Firewall".',
                },
              ],
              preview: {
                select: {
                  name: "technology.name",
                  techType: "type",
                },
                prepare: ({
                  name,
                  techType,
                }: {
                  name?: string;
                  techType?: string;
                }) => ({
                  // Match Client Overview list style: name as title, type as subtitle
                  title: name || "Select a technology",
                  subtitle: techType || undefined,
                }),
              },
            },
          ],
        },
      ],
    },
    {
      name: "beforeAfter",
      title: "Before & After",
      type: "object",
      group: "content",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (Rule: {
            required: () => { max: (n: number) => unknown };
          }) => Rule.required().max(100),
        },
        {
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "metric", title: "Metric", type: "string" },
                { name: "before", title: "Before", type: "string" },
                { name: "after", title: "After", type: "string" },
              ],
              preview: {
                select: { title: "metric", subtitle: "after" },
              },
            },
          ],
          validation: (Rule: {
            required: () => { min: (n: number) => unknown };
          }) => Rule.required().min(2),
        },
      ],
    },
    {
      name: "results",
      title: "Results",
      type: "object",
      group: "content",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (Rule: {
            required: () => { max: (n: number) => unknown };
          }) => Rule.required().max(100),
        },
        {
          name: "outcomes",
          title: "Outcomes",
          type: "array",
          of: [
            {
              type: "string",
              validation: (Rule: { max: (n: number) => unknown }) =>
                Rule.max(100),
            },
          ],
          description:
            "One outcome per line. Drag to reorder. Start with the result, not the process.",
          validation: (Rule: {
            required: () => { min: (n: number) => unknown };
          }) => Rule.required().min(2),
        },
      ],
    },
    noteSlotField(
      "noteAfterProblem",
      "Note after Problem",
      "Off by default. Renders between Problem and Solution when switched on."
    ),
    noteSlotField(
      "noteAfterSolution",
      "Note after Solution",
      "Off by default. Renders between Solution and Before & After when switched on."
    ),
    noteSlotField(
      "noteAfterResults",
      "Note after Results",
      "Off by default. Renders after Results (same position as the previous single Note). Existing quotes were migrated here."
    ),
    {
      name: "whatsNext",
      title: "What's Next",
      type: "string",
      group: "content",
      description:
        "Leave blank if there's no next phase, the section just won't show.",
      validation: (Rule: { max: (n: number) => unknown }) => Rule.max(200),
    },
    {
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description:
        "Under 60 characters. Shows in Google and the browser tab (not on the page). Tip: ask an AI — 'Write an SEO title under 60 characters for a case study about: [one sentence]. Clear and factual, important words near the front.'",
      validation: (Rule: {
        required: () => { max: (n: number) => unknown };
      }) => Rule.required().max(60),
    },
    {
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Under 155 characters. Preview under the title in Google. Tip: ask an AI — 'Write a meta description under 155 characters for a case study about: [same summary]. Natural, include the key result.'",
      validation: (Rule: {
        required: () => { max: (n: number) => unknown };
      }) => Rule.required().max(155),
    },
    {
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "seo",
      options: { source: "headline" },
      description:
        "Public URL: /resources/case-studies/[slug]. Lowercase, numbers, hyphens only. Examples: ransomware-recovery-chemical-manufacturing · cloud-migration-mid-market-retail. Usually fine auto-generated from the headline — edit only if awkward or too long.",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "ogImage",
      title: "Social share image",
      type: "image",
      group: "seo",
      description:
        "Optional. LinkedIn / WhatsApp share image. If blank, platforms fall back to a generic preview (no custom image).",
    },
  ],
  preview: {
    select: {
      title: "headline",
      client: "overview.heading",
      industry: "industry",
    },
    prepare: ({
      title,
      client,
      industry,
    }: {
      title?: string;
      client?: string;
      industry?: string;
    }) => ({
      title: title || "Untitled case study",
      subtitle: [client, industry].filter(Boolean).join(" · ") || undefined,
    }),
  },
};

export const schemaTypes = [technology, caseStudy];
