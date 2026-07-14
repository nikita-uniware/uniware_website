import fs from "fs";

/** Apply URL audit v1 replacements — always write UTF-8. */
export function applyUrlAudit(html) {
  return html
    .replace(/\/incident-readiness\/assessment\//g, "/solutions/cybersecurity/security-assessment/")
    .replace(/\/incident-readiness\/assessment/g, "/solutions/cybersecurity/security-assessment")
    .replace(/href="\/contact\/"/g, 'href="/company/contact/"')
    .replace(/href="\/contact"/g, 'href="/company/contact"')
    .replace(
      /\/resources\/case-studies\/ransomware-recovery-manufacturing\//g,
      "/resources/case-studies/ransomware-recovery-chemical-manufacturing/"
    )
    .replace(
      /\/resources\/case-studies\/ransomware-recovery-manufacturing/g,
      "/resources/case-studies/ransomware-recovery-chemical-manufacturing"
    )
    .replace(/href="\/cybersecurity\/"/g, 'href="/solutions/cybersecurity/"')
    .replace(/href="\/cybersecurity"/g, 'href="/solutions/cybersecurity"')
    .replace(/href="\/case-studies"/g, 'href="/resources/case-studies"');
}

const targets = [
  "_extract/cybersecurity-body.rewritten.html",
  "_extract/case-study-body.rewritten.html",
];

for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  const fixed = applyUrlAudit(fs.readFileSync(file, "utf8"));
  fs.writeFileSync(file, fixed, "utf8");
  console.log("URL audit applied:", file);
}
