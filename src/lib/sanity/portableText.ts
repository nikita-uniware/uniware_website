/**
 * Converts Sanity Portable Text blocks into plain text with **bold** markers
 * so existing CaseStudyPage renderBoldOnly() keeps working.
 */
type PortableSpan = {
  _type?: string;
  text?: string;
  marks?: string[];
};

type PortableMarkDef = {
  _key?: string;
  _type?: string;
};

type PortableBlock = {
  _type?: string;
  children?: PortableSpan[];
  markDefs?: PortableMarkDef[];
};

export function portableTextToBoldMarkdown(
  blocks: PortableBlock[] | string | null | undefined
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

export function portableTextBlocksToParagraphs(
  blocks: PortableBlock[] | null | undefined
): string[] {
  if (!blocks?.length) return [];
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
    .filter(Boolean);
}
