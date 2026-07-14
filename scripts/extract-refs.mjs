import fs from "fs";

function extract(html, name) {
  const sm = html.match(/<style>([\s\S]*?)<\/style>/);
  const bm = html.match(/<body>([\s\S]*?)<\/body>/);
  fs.mkdirSync("src/styles", { recursive: true });
  fs.mkdirSync("_extract", { recursive: true });
  if (sm) fs.writeFileSync(`src/styles/${name}.css`, sm[1]);
  if (bm) {
    const body = bm[1].replace(/<script>[\s\S]*?<\/script>/g, "").trim();
    fs.writeFileSync(`_extract/${name}-body.html`, body);
  }
  console.log(name, "css", sm?.[1].length ?? 0, "body", bm?.[1].length ?? 0);
}

const cyber = fs.readFileSync("uniware-cybersecurity.html", "utf8");
const cs = fs.readFileSync("uniware-case-study.html", "utf8");
extract(cyber, "cybersecurity");
extract(cs, "case-study");

const csm = cyber.match(/<script>([\s\S]*?)<\/script>/);
const cssm = cs.match(/<script>([\s\S]*?)<\/script>/);
if (csm) fs.writeFileSync("_extract/cybersecurity.js", csm[1]);
if (cssm) fs.writeFileSync("_extract/case-study.js", cssm[1]);
console.log("scripts", csm?.[1].length ?? 0, cssm?.[1].length ?? 0);
