export type Domain = {
  name: string;
  description: string;
};

export const domains: Domain[] = [
  {
    name: "Plans and Policies",
    description:
      "This section looks at whether your organisation has the foundational plans and documentation in place to manage a cyber incident. Having these documented is what determines whether your team knows what to do when something happens.",
  },
  {
    name: "Spotting Problems Early",
    description:
      "This section looks at how quickly your organisation would know if something was wrong. Many breaches go undetected for days or weeks. The earlier you spot unusual activity, the more contained the damage tends to be.",
  },
  {
    name: "Reacting Fast",
    description:
      "This section looks at what actually happens in the first hours of an incident. Having good policies matters, but the response phase is where preparation either pays off or falls apart under pressure.",
  },
  {
    name: "Getting Back Up",
    description:
      "This section looks at how quickly and completely your organisation could restore normal operations after an incident. Recovery is often underplanned, and getting back up fast is what determines the real business impact.",
  },
  {
    name: "Learning and Adapting",
    description:
      "This section looks at whether your organisation treats cyber readiness as an ongoing discipline rather than a one-time exercise. Organisations that improve consistently after incidents or near-misses are significantly more resilient over time.",
  },
];

export type Question = {
  domainIndex: number;
  text: string;
};

export const questions: Question[] = [
  {
    domainIndex: 0,
    text: "Does your organisation have a documented Incident Response Plan that your team can actually follow?",
  },
  {
    domainIndex: 0,
    text: "If an incident happened today, does everyone in your organisation know their role and who is responsible for what?",
  },
  {
    domainIndex: 0,
    text: "Do you have specific response playbooks for common attack types such as ransomware or phishing?",
  },
  {
    domainIndex: 1,
    text: "Do you have centralised security monitoring across your systems, such as a SIEM or equivalent tool?",
  },
  {
    domainIndex: 1,
    text: "Is your environment monitored continuously, or only during business hours?",
  },
  {
    domainIndex: 1,
    text: "Are security and system logs collected and stored in a central location, so you can review activity across your environment?",
  },
  {
    domainIndex: 2,
    text: "Does your team have documented, step-by-step procedures for responding to a cyber incident, beyond just a general IR plan?",
  },
  {
    domainIndex: 2,
    text: "If a device or system in your organisation was compromised right now, could your team isolate it quickly to stop the threat from spreading?",
  },
  {
    domainIndex: 2,
    text: "Is it clear who gets notified, in what order, and how decisions get made when an incident is escalating?",
  },
  {
    domainIndex: 3,
    text: "Are your critical systems and data backed up regularly, and are those backups stored separately from your main environment?",
  },
  {
    domainIndex: 3,
    text: "Have you recently tested whether your backups can actually be restored successfully, not just that they exist?",
  },
  {
    domainIndex: 3,
    text: "Does your organisation know how long it could tolerate systems being down, and how much data loss would be acceptable, before it causes serious business impact?",
  },
  {
    domainIndex: 4,
    text: "Has your team ever run a simulated cyber incident, such as a tabletop exercise, to test how you would actually respond?",
  },
  {
    domainIndex: 4,
    text: "After a security incident or near-miss, does your organisation formally document what happened and what should change?",
  },
  {
    domainIndex: 4,
    text: "When gaps or weaknesses in your cyber readiness are identified, is there a clear process for addressing them, with someone accountable for following through?",
  },
];

export type AnswerValue = 0 | 1 | 2;

export type AnswerOption = {
  label: string;
  sub: string;
  value: AnswerValue;
};

export const answerOptions: AnswerOption[] = [
  {
    label: "Yes, this is in place",
    sub: "Documented, operational, and tested. The team knows how to use it.",
    value: 2,
  },
  {
    label: "Partially, or we are working on it",
    sub: "Something exists but is incomplete, outdated, or not universally known.",
    value: 1,
  },
  {
    label: "No, or we are not sure",
    sub: "Not in place, or the respondent does not know whether it exists.",
    value: 0,
  },
];

export type TierId = "good" | "some" | "attention";

export type TierCopy = {
  id: TierId;
  badge: string;
  headline: string;
  body: string;
};

export const tierCopy: Record<TierId, TierCopy> = {
  good: {
    id: "good",
    badge: "Good shape",
    headline: "Your organisation has strong foundations in place.",
    body: "You have clearly invested in your incident readiness. There may be specific areas worth sharpening further. A conversation with our team can help identify where your attention has the most impact.",
  },
  some: {
    id: "some",
    badge: "Some gaps identified",
    headline: "A solid starting point, with some areas to develop.",
    body: "This is where most organisations sit. You have practices in place, but gaps worth understanding before they become a problem. They are addressable with the right guidance.",
  },
  attention: {
    id: "attention",
    badge: "Attention needed",
    headline: "Your readiness foundations need attention. Knowing that puts you ahead.",
    body: "Many organisations have not had the opportunity to build these foundations yet. Knowing where you stand is the critical first step. Our team will help you prioritise what gives you the most protection, quickly.",
  },
};

export const contactName = "Nirmal Kumar";
export const contactEmail = "sales@uniware.net";
export const contactPhoneDisplay = "+91 98408 61475";
export const contactPhoneHref = "+919840861475";
