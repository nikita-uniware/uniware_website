import {
  PortableText,
  type PortableTextBlockComponent,
  type PortableTextComponents,
} from "@portabletext/react";
import type { CaseStudyPortableTextBlock } from "@/lib/sanity/portableText";
import { normalizeCaseStudyRichText } from "@/lib/sanity/portableText";

type Props = {
  value: CaseStudyPortableTextBlock[] | string | string[] | null | undefined;
  className?: string;
  reveal?: string;
};

const blockComponents: Record<string, PortableTextBlockComponent> = {
  normal: ({ children }) => <p className="cs-block-body">{children}</p>,
  h4: ({ children }) => <h3 className="cs-subheading">{children}</h3>,
};

const components: PortableTextComponents = {
  block: blockComponents,
  list: {
    bullet: ({ children }) => (
      <ul className="cs-rich-list cs-rich-list--bullet">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="cs-rich-list cs-rich-list--number">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="cs-rich-list-item">{children}</li>,
    number: ({ children }) => <li className="cs-rich-list-item">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
  },
};

export function CaseStudyRichText({ value, className, reveal }: Props) {
  const blocks = normalizeCaseStudyRichText(value);
  if (blocks.length === 0) return null;

  return (
    <div
      className={["cs-rich-text", className].filter(Boolean).join(" ")}
      {...(reveal ? { "data-reveal": reveal } : {})}
    >
      <PortableText value={blocks} components={components} />
    </div>
  );
}
