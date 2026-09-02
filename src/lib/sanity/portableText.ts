/**
 * Portable Text helpers for case study rich body fields.
 */
export type CaseStudyPortableTextBlock = {
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: {
    _type?: string;
    text?: string;
    marks?: string[];
  }[];
  markDefs?: { _key?: string; _type?: string }[];
};

type PortableSpan = NonNullable<CaseStudyPortableTextBlock["children"]>[number];

function parseInlineMarkdown(text: string): PortableSpan[] {
  const spans: PortableSpan[] = [];
  for (const part of text.split(/(\*\*[^*]+\*\*)/g)) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**")) {
      spans.push({ _type: "span", text: part.slice(2, -2), marks: ["strong"] });
    } else {
      spans.push({ _type: "span", text: part, marks: [] });
    }
  }
  return spans;
}

function paragraphBlock(text: string): CaseStudyPortableTextBlock {
  return {
    _type: "block",
    style: "normal",
    children: parseInlineMarkdown(text),
    markDefs: [],
  };
}

/** Converts legacy **bold** markdown strings into portable text blocks. */
export function markdownToPortableTextBlocks(
  text: string
): CaseStudyPortableTextBlock[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return [paragraphBlock(trimmed)];
}

/** Converts legacy paragraph strings into portable text blocks. */
export function paragraphsToPortableTextBlocks(
  paragraphs: string[]
): CaseStudyPortableTextBlock[] {
  return paragraphs
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => paragraphBlock(p));
}

export function normalizeCaseStudyRichText(
  value:
    | CaseStudyPortableTextBlock[]
    | string
    | string[]
    | null
    | undefined
): CaseStudyPortableTextBlock[] {
  if (!value) return [];
  if (typeof value === "string") return markdownToPortableTextBlocks(value);
  if (Array.isArray(value) && value.length > 0) {
    if (typeof value[0] === "string") {
      return paragraphsToPortableTextBlocks(value as string[]);
    }
    return value as CaseStudyPortableTextBlock[];
  }
  return [];
}

/**
 * Converts Sanity Portable Text blocks into plain text with **bold** markers
 * so existing renderBoldOnly() keeps working for subtext / quotes / cards.
 */
export function portableTextToBoldMarkdown(
  blocks: CaseStudyPortableTextBlock[] | string | null | undefined
): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;

  return blocks
    .filter((b) => b?._type === "block")
    .map((block) => {
      const children = block.children ?? [];
      return children
        .map((span) => {
          const text = span.text ?? "";
          if (!text) return "";
          const marks = span.marks ?? [];
          if (marks.includes("strong")) return `**${text}**`;
          return text;
        })
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

/** @deprecated Use normalizeCaseStudyRichText + CaseStudyRichText instead. */
export function portableTextBlocksToParagraphs(
  blocks: CaseStudyPortableTextBlock[] | null | undefined
): string[] {
  if (!blocks?.length) return [];
  return blocks
    .filter((b) => b?._type === "block" && !b.listItem)
    .map((block) => {
      const children = block.children ?? [];
      return children
        .map((span) => {
          const text = span.text ?? "";
          if (!text) return "";
          const marks = span.marks ?? [];
          if (marks.includes("strong")) return `**${text}**`;
          return text;
        })
        .join("");
    })
    .filter(Boolean);
}
