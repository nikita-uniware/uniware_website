export type CaseStudyStat = {
  number: string;
  label: string;
};

export type CaseStudyTechnology = {
  name: string;
  type?: string;
};

export type CaseStudyStep = {
  title: string;
  body: string;
};

export type BeforeAfterRow = {
  metric: string;
  before: string;
  after: string;
};

export type CaseStudyNote = {
  source: "client" | "team";
  quote: string;
  name: string;
  designation: string;
  company: string;
};

export type CaseStudy = {
  slug: string;
  categoryTags: string[];
  headline: string;
  subtext: string;
  stats: CaseStudyStat[];
  overview: {
    heading: string;
    description: string;
    location: string;
    timeline?: string;
    deliveredBy: string;
    technologies: CaseStudyTechnology[];
  };
  problem: {
    heading: string;
    body: string[];
  };
  solution: {
    heading: string;
    body: string;
    showSteps: boolean;
    steps: CaseStudyStep[];
    showTechnologies: boolean;
    technologies: CaseStudyTechnology[];
  };
  beforeAfter: {
    heading: string;
    rows: BeforeAfterRow[];
  };
  results: {
    heading: string;
    outcomes: string[];
  };
  note?: CaseStudyNote;
  whatsNext?: string;
  seo: {
    title: string;
    description: string;
  };
};

/** Chemical Manufacturing — Totale (anonymized). Hardcoded until Sanity is wired. */
export const chemicalManufacturingCaseStudy: CaseStudy = {
  slug: "ransomware-recovery-chemical-manufacturing",
  categoryTags: ["Cybersecurity", "Data Protection", "Infrastructure"],
  headline:
    "Ransomware recovery for a five-division manufacturing business, in 72 hours.",
  subtext:
    "A 300-person chemical manufacturing business with five divisions across Tamil Nadu. No ransom paid. No repeat incidents since.",
  stats: [
    { number: "72 Hrs", label: "Full rebuild" },
    { number: "5", label: "Divisions restored" },
    { number: "300+", label: "Staff back online" },
    { number: "Zero", label: "Ransom paid" },
  ],
  overview: {
    heading: "Chemical Manufacturing",
    description:
      "A 300-person chemical manufacturing business with five divisions across Tamil Nadu.",
    location: "Chennai, India",
    timeline: "72 hours, emergency response",
    deliveredBy: "Uniware Systems",
    technologies: [
      { name: "CrowdStrike", type: "Falcon EDR" },
      { name: "Fortinet", type: "Firewall" },
      { name: "Veeam", type: "Backup" },
    ],
  },
  problem: {
    heading: "A single server failure turned out to be the entire business.",
    body: [
      "Within hours, staff across all five divisions could not access files, applications, or any business system. The team initially thought one server had failed. Every server across every division had in fact been encrypted overnight, along with the laptops of finance and management staff.",
      "There was no firewall at any location, no multi-factor authentication, and antivirus software that had been disabled by the attacker using standard Windows tools. **The attacker had been inside the network for roughly 14 hours before the ransomware ran.**",
      "The only surviving restore point was a backup taken months earlier by a third-party software vendor during a routine upgrade.",
    ],
  },
  solution: {
    heading: "A complete rebuild, from zero to fully protected.",
    body: "Uniware's team followed the NIST Cybersecurity Framework end to end, giving the recovery a documented, auditable structure. **This project took five stages. Others may take three, or six, depending on scope.**",
    showSteps: true,
    steps: [
      {
        title: "Identify",
        body: "CrowdStrike deployed immediately across every reachable system, giving the team endpoint protection and the business's first complete device list at the same time.",
      },
      {
        title: "Protect",
        body: "Fortinet firewalls installed at every location. Secure VPN with MFA replaced exposed remote desktop access. Active Directory rebuilt from scratch with hardened policies.",
      },
      {
        title: "Detect",
        body: "Tamper-proof activity logging and automated alerts configured for suspicious behaviour going forward.",
      },
      {
        title: "Respond",
        body: "Compromised accounts disabled, passwords reset business-wide, forensic evidence preserved on original drives.",
      },
      {
        title: "Recover",
        body: "Servers rebuilt on clean hardware. Data restored from the last available backup, with the remaining gap re-entered by all 300 staff within two days.",
      },
    ],
    showTechnologies: true,
    technologies: [
      { name: "CrowdStrike", type: "Falcon EDR" },
      { name: "Fortinet", type: "Firewall" },
      { name: "Veeam", type: "Backup" },
    ],
  },
  beforeAfter: {
    heading: "Read row by row, what actually changed.",
    rows: [
      {
        metric: "Firewall",
        before: "None at any location",
        after: "Fortinet with IPS at every location",
      },
      {
        metric: "Remote access",
        before: "Exposed, no MFA",
        after: "Secure VPN with MFA",
      },
      {
        metric: "Endpoint protection",
        before: "Basic antivirus, disabled by attacker",
        after: "CrowdStrike on all servers and workstations",
      },
      {
        metric: "Backups",
        before: "On the same server, plus a connected USB drive",
        after: "Veeam Backup + rotational offline drives",
      },
      {
        metric: "User accounts",
        before: "Weak passwords, no MFA, no lockout",
        after: "Strong passwords, MFA, lockout policies",
      },
      { metric: "Asset inventory", before: "None", after: "Full device inventory" },
      {
        metric: "Incident response plan",
        before: "None in place",
        after: "Documented playbook delivered",
      },
    ],
  },
  results: {
    heading: "What changed, in practice.",
    outcomes: [
      "Zero repeat incidents since the recovery",
      "Full device inventory created for the first time",
      "Documented incident response playbook now in place",
      "Layered backup strategy protects against future attacks",
    ],
  },
  note: {
    source: "team",
    quote:
      "If a client calls over the weekend, it is almost always ransomware. We went immediately, and the whole team rallied, including all 300 staff who helped re-enter two days of missing data by hand.",
    name: "Dhanasekar",
    designation: "Chief Technology Officer",
    company: "Uniware Systems",
  },
  whatsNext:
    "Phase 2 is underway: long-term backup retention is moving to the cloud, layered on top of the fast local recovery already in place.",
  seo: {
    title: "Ransomware Recovery in 72 Hours | Chemical Manufacturing",
    description:
      "How Uniware Systems rebuilt a 300-person manufacturing business's entire IT environment in 72 hours after a LockBit ransomware attack. No ransom paid.",
  },
};

/** Renders rich text that only allows **bold** markers from the content model. */
export function renderBoldOnly(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
