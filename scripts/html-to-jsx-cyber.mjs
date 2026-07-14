/**
 * Converts cybersecurity reference HTML → React JSX module.
 */
import fs from "fs";

let html = fs.readFileSync("_extract/cybersecurity-body.rewritten.html", "utf8");

html = html
  .replace(/<header class="site-nav"[\s\S]*?<\/header>\s*/g, "")
  .replace(/<footer class="site-footer"[\s\S]*?<\/footer>\s*/g, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .trim();

function cssToJsxStyle(css) {
  const entries = css
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((decl) => {
      const i = decl.indexOf(":");
      if (i === -1) return null;
      let prop = decl.slice(0, i).trim();
      const val = decl.slice(i + 1).trim();
      if (prop.startsWith("--")) {
        return `${JSON.stringify(prop)}: ${JSON.stringify(val)}`;
      }
      prop = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${prop}: ${JSON.stringify(val)}`;
    })
    .filter(Boolean);
  return `{{ ${entries.join(", ")} } as CSSProperties}`;
}

function convertOpenTag(tag) {
  let t = tag
    .replace(/\bclass=/g, "className=")
    .replace(/\bstroke-width=/g, "strokeWidth=")
    .replace(/\bstroke-linecap=/g, "strokeLinecap=")
    .replace(/\bstroke-linejoin=/g, "strokeLinejoin=")
    .replace(/\bfill-rule=/g, "fillRule=")
    .replace(/\bclip-rule=/g, "clipRule=")
    .replace(/\bclip-path=/g, "clipPath=")
    .replace(/\bstop-color=/g, "stopColor=")
    .replace(/\bfont-family=/g, "fontFamily=")
    .replace(/\bfont-size=/g, "fontSize=")
    .replace(/\bfont-weight=/g, "fontWeight=")
    .replace(/\bletter-spacing=/g, "letterSpacing=")
    .replace(/\btext-anchor=/g, "textAnchor=")
    .replace(/\bxlink:href=/g, "xlinkHref=")
    .replace(/\bcrossorigin=/g, "crossOrigin=")
    .replace(/\bautocomplete=/g, "autoComplete=")
    .replace(/\btabindex=/g, "tabIndex=")
    .replace(/\bfor=/g, "htmlFor=");

  t = t.replace(/\bstyle="([^"]*)"/g, (_, css) => `style=${cssToJsxStyle(css)}`);

  const voidRe =
    /^<(img|br|hr|input|meta|link|source|area|base|col|embed|wbr)(\s|\/|>)/i;
  if (voidRe.test(t) && !/\/>$/.test(t)) {
    t = t.replace(/>$/, " />");
  }
  return t;
}

html = html.replace(/<\/?[a-zA-Z][^>]*>/g, (tag) => {
  if (tag.startsWith("</")) return tag;
  return convertOpenTag(tag);
});

// Escape quotes/apostrophes in text nodes for react/no-unescaped-entities
html = html.replace(/>([^<]*)</g, (_, text) => {
  return `>${text.replace(/"/g, "&quot;").replace(/'/g, "&apos;")}<`;
});

// Subnav <li> needs className="flex" per design system Appendix D
html = html.replace(
  /<ul className="subnav-list">\s*<li>/g,
  '<ul className="subnav-list">\n      <li className="flex">'
);
html = html.replace(/<\/li>\s*<li>/g, '</li>\n      <li className="flex">');

const out = `"use client";

import type { CSSProperties } from "react";

/**
 * Auto-generated from uniware-cybersecurity.html reference.
 * Visual markup preserved from the approved preview HTML.
 * Re-run: node scripts/html-to-jsx-cyber.mjs
 */
/* eslint-disable @next/next/no-img-element */
export function CybersecurityContent() {
  return (
    <>
${html
  .split("\n")
  .map((line) => (line.length ? `      ${line}` : ""))
  .join("\n")}
    </>
  );
}
`;

fs.mkdirSync("src/components/cybersecurity", { recursive: true });
fs.writeFileSync("src/components/cybersecurity/CybersecurityContent.tsx", out);
console.log(
  "Wrote CybersecurityContent.tsx",
  `${(out.length / 1024).toFixed(1)} KB`,
  `(${out.split("\n").length} lines)`
);
