/**
 * Case study categoryTags <-> URL slug mapping for /resources/case-studies
 * filter tabs. Not derivable by simple kebab-casing ("AI & Automation" ->
 * "ai-automation" isn't a mechanical transform) — kept as an explicit map
 * per the handoff spec.
 */
export const CATEGORY_SLUG_BY_TAG: Record<string, string> = {
  Cloud: "cloud",
  Cybersecurity: "cybersecurity",
  "Modern Workplace": "modern-workplace",
  "Data Protection": "data-protection",
  "AI & Automation": "ai-automation",
  Infrastructure: "infrastructure",
};

const TAG_BY_CATEGORY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_BY_TAG).map(([tag, slug]) => [slug, tag])
);

export function categoryTagToSlug(tag: string): string | null {
  return CATEGORY_SLUG_BY_TAG[tag] ?? null;
}

export function categorySlugToTag(slug: string): string | null {
  return TAG_BY_CATEGORY_SLUG[slug] ?? null;
}
