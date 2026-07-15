import fs from "fs";
import { applyUrlAudit } from "./apply-url-audit.mjs";

/**
 * Keep page subnav. Only strip global chrome owned by the root layout.
 */
function stripChrome(html) {
  return html
    .replace(/<script>[\s\S]*?<\/script>/g, "")
    .replace(/<header class="site-nav"[\s\S]*?<\/header>\s*/g, "")
    .replace(/<footer class="site-footer"[\s\S]*?<\/footer>\s*/g, "")
    // Drop orphaned site-nav comments that sat above the header in the ref HTML
    .replace(
      /<!--\s*=+\s*SITE NAV[\s\S]*?={3,}\s*-->\s*/g,
      ""
    )
    .trim();
}

function writeMarkupModule(srcHtml, outTs, exportName) {
  let html = applyUrlAudit(stripChrome(fs.readFileSync(srcHtml, "utf8")));
  const escaped = html
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
  const mod = `/* Auto-generated from reference HTML. Do not edit by hand. */\nexport const ${exportName} = \`${escaped}\`;\n`;
  fs.writeFileSync(outTs, mod);

  // Sanity-check tag balance for common elements
  for (const t of ["div", "section", "nav", "ul", "li"]) {
    const open = (html.match(new RegExp(`<${t}[\\s>]`, "g")) || []).length;
    const close = (html.match(new RegExp(`</${t}>`, "g")) || []).length;
    if (open !== close) {
      console.warn(`  WARN ${exportName}: <${t}> open=${open} close=${close}`);
    }
  }
  console.log("Wrote", outTs, `(${(mod.length / 1024).toFixed(1)} KB)`);
}

fs.mkdirSync("src/content", { recursive: true });
writeMarkupModule(
  "_extract/cybersecurity-body.rewritten.html",
  "src/content/cybersecurity-markup.ts",
  "cybersecurityMarkup"
);
writeMarkupModule(
  "_extract/case-study-body.rewritten.html",
  "src/content/case-study-markup.ts",
  "caseStudyMarkup"
);

fs.writeFileSync(
  "src/styles/cybersecurity.page.css",
  fs.readFileSync("src/styles/cybersecurity.css", "utf8")
);
fs.writeFileSync(
  "src/styles/case-study.page.css",
  fs.readFileSync("src/styles/case-study.css", "utf8")
);
console.log("Page CSS ready");
