import fs from "fs";
import path from "path";

const PUBLIC = "public/brand";
fs.mkdirSync(PUBLIC, { recursive: true });
fs.mkdirSync("public/partners", { recursive: true });

const seen = new Map();
let logoIdx = 0;
let partnerIdx = 0;

function decodeDataUri(uri) {
  const m = uri.match(/^data:image\/svg\+xml;base64,(.+)$/);
  if (!m) return null;
  return Buffer.from(m[1], "base64");
}

function extractFromHtml(file, { partners = false } = {}) {
  const html = fs.readFileSync(file, "utf8");
  return html.replace(
    /src="(data:image\/svg\+xml;base64,[^"]+)"/g,
    (full, uri) => {
      if (seen.has(uri)) return `src="${seen.get(uri)}"`;
      const buf = decodeDataUri(uri);
      if (!buf) return full;
      let outPath;
      if (partners) {
        partnerIdx += 1;
        outPath = `/partners/logo-${partnerIdx}.svg`;
        fs.writeFileSync(path.join("public", outPath.slice(1)), buf);
      } else {
        // First two unique logos from case study / cyber nav are brand
        logoIdx += 1;
        const name =
          logoIdx === 1
            ? "logo-mark.svg"
            : logoIdx === 2
              ? "logo-wordmark.svg"
              : `logo-extra-${logoIdx}.svg`;
        outPath = `/brand/${name}`;
        fs.writeFileSync(path.join("public", outPath.slice(1)), buf);
      }
      seen.set(uri, outPath);
      return `src="${outPath}"`;
    }
  );
}

// Brand logos from case study (smaller, cleaner first)
let cs = extractFromHtml("uniware-case-study.html");
// Reset partner extraction for cyber — keep brand map
const brandSeen = new Map(seen);
let cyber = fs.readFileSync("uniware-cybersecurity.html", "utf8");

// Replace known brand URIs first
for (const [uri, outPath] of brandSeen) {
  cyber = cyber.split(uri).join(outPath.replace(/^\//, "").length ? `unused` : "");
}

// Simpler: rewrite all data URIs in both bodies after CSS extract
function rewriteBody(htmlPath, outPath, partnerMode) {
  let body = fs.readFileSync(htmlPath, "utf8");
  body = body.replace(
    /src="(data:image\/svg\+xml;base64,[^"]+)"/g,
    (full, uri) => {
      if (seen.has(uri)) return `src="${seen.get(uri)}"`;
      const buf = decodeDataUri(uri);
      if (!buf) return full;
      let dest;
      if (partnerMode && !uri.includes("E9A638")) {
        // heuristic weak — just use sequential for unknown
      }
      // Check size / content for brand
      const text = buf.toString("utf8");
      const isBrand =
        text.includes("E9A638") && text.includes("BB6D08") && text.includes("paint0");
      if (isBrand && text.length > 50000) {
        dest = "/brand/logo-wordmark.svg";
      } else if (isBrand && text.length < 50000) {
        dest = "/brand/logo-mark.svg";
      } else {
        partnerIdx += 1;
        dest = `/partners/logo-${partnerIdx}.svg`;
      }
      if (!fs.existsSync(path.join("public", dest.slice(1)))) {
        fs.writeFileSync(path.join("public", dest.slice(1)), buf);
      }
      seen.set(uri, dest);
      return `src="${dest}"`;
    }
  );
  fs.writeFileSync(outPath, body);
  return body;
}

rewriteBody("_extract/case-study-body.html", "_extract/case-study-body.rewritten.html", false);
rewriteBody("_extract/cybersecurity-body.html", "_extract/cybersecurity-body.rewritten.html", true);

console.log("Unique assets:", seen.size);
console.log(
  "Brand:",
  fs.readdirSync("public/brand"),
  "Partners:",
  fs.readdirSync("public/partners").length
);
