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

const CATEGORY_TAGS = [
  { title: "Cloud", value: "Cloud" },
  { title: "Cybersecurity", value: "Cybersecurity" },
  { title: "Modern Workplace", value: "Modern Workplace" },
  { title: "Data Protection", value: "Data Protection" },
  { title: "AI & Automation", value: "AI & Automation" },
  { title: "Infrastructure", value: "Infrastructure" },
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
  ],
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
        {
          name: "technologies",
          title: "Technologies used",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "technology",
                  title: "Technology",
                  type: "reference",
                  to: [{ type: "technology" }],
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
                select: { title: "technology.name", subtitle: "type" },
              },
            },
          ],
          validation: (Rule: {
            required: () => { min: (n: number) => unknown };
          }) => Rule.required().min(1),
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
            "Pick from the Technology list. Drag to reorder. Required when Show technologies is on.",
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
                },
              ],
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
    {
      name: "showNote",
      title: "Show note section",
      type: "boolean",
      group: "content",
      initialValue: false,
      description:
        "Only switch on if you actually have a quote or comment.",
    },
    {
      name: "note",
      title: "Note",
      type: "object",
      group: "content",
      hidden: ({ parent }: { parent?: { showNote?: boolean } }) =>
        !parent?.showNote,
      fields: [
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
          validation: (Rule: {
            custom: (
              fn: (
                value: unknown,
                context: { document?: { showNote?: boolean } }
              ) => true | string
            ) => unknown;
          }) =>
            Rule.custom(
              (
                value: unknown,
                context: { document?: { showNote?: boolean } }
              ) => {
                if (!context.document?.showNote) return true;
                if (!value) return "Choose client or team when note is shown";
                return true;
              }
            ),
        },
        {
          name: "quote",
          title: "Quote text",
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
          description: "Keep to 2–3 sentences. Max ~300 characters.",
          validation: (Rule: {
            custom: (
              fn: (
                value: PortableBlock[] | undefined,
                context: { document?: { showNote?: boolean } }
              ) => true | string
            ) => unknown;
          }) =>
            Rule.custom(
              (
                value: PortableBlock[] | undefined,
                context: { document?: { showNote?: boolean } }
              ) => {
                if (!context.document?.showNote) return true;
                const len = portableTextLength(value);
                if (len === 0) return "Quote is required when note is shown";
                if (len > 300) return `Keep under 300 characters (currently ${len})`;
                return true;
              }
            ),
        },
        {
          name: "name",
          title: "Name",
          type: "string",
          validation: (Rule: {
            custom: (
              fn: (
                value: unknown,
                context: { document?: { showNote?: boolean } }
              ) => true | string
            ) => unknown;
          }) =>
            Rule.custom(
              (
                value: unknown,
                context: { document?: { showNote?: boolean } }
              ) => {
                if (!context.document?.showNote) return true;
                if (!value) return "Name is required when note is shown";
                return true;
              }
            ),
        },
        {
          name: "designation",
          title: "Designation",
          type: "string",
          validation: (Rule: {
            custom: (
              fn: (
                value: unknown,
                context: { document?: { showNote?: boolean } }
              ) => true | string
            ) => unknown;
          }) =>
            Rule.custom(
              (
                value: unknown,
                context: { document?: { showNote?: boolean } }
              ) => {
                if (!context.document?.showNote) return true;
                if (!value) return "Designation is required when note is shown";
                return true;
              }
            ),
        },
        {
          name: "company",
          title: "Company",
          type: "string",
          validation: (Rule: {
            custom: (
              fn: (
                value: unknown,
                context: { document?: { showNote?: boolean } }
              ) => true | string
            ) => unknown;
          }) =>
            Rule.custom(
              (
                value: unknown,
                context: { document?: { showNote?: boolean } }
              ) => {
                if (!context.document?.showNote) return true;
                if (!value) return "Company is required when note is shown";
                return true;
              }
            ),
        },
      ],
    },
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
    select: { title: "headline", subtitle: "overview.heading" },
  },
};

export const schemaTypes = [technology, caseStudy];
