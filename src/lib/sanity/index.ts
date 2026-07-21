import { getSanityClient, isSanityConfigured } from "./client";
import {
  allCaseStudiesQuery,
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
  technologiesQuery,
} from "./queries";
import { mapSanityCaseStudy, type SanityCaseStudyDoc } from "./mappers";
import type { CaseStudy } from "@/content/case-studies/chemical-manufacturing";
import { chemicalManufacturingCaseStudy } from "@/content/case-studies/chemical-manufacturing";
import {
  LOCAL_TECHNOLOGY_LOGOS,
  type TechnologyLogo,
} from "./partnerStrip";

/** Local fallback while Studio content is empty / unpublished. */
const LOCAL_FALLBACKS: Record<string, CaseStudy> = {
  [chemicalManufacturingCaseStudy.slug]: chemicalManufacturingCaseStudy,
};

export async function fetchCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  if (isSanityConfigured()) {
    try {
      const client = getSanityClient();
      if (client) {
        const doc = await client.fetch<SanityCaseStudyDoc | null>(
          caseStudyBySlugQuery,
          { slug }
        );
        const mapped = mapSanityCaseStudy(doc);
        if (mapped) return mapped;
      }
    } catch (err) {
      console.error("[sanity] fetchCaseStudyBySlug failed:", err);
    }
  }

  return LOCAL_FALLBACKS[slug] ?? null;
}

export async function fetchCaseStudySlugs(): Promise<string[]> {
  const localSlugs = Object.keys(LOCAL_FALLBACKS);

  if (!isSanityConfigured()) return localSlugs;

  try {
    const client = getSanityClient();
    if (!client) return localSlugs;
    const slugs = await client.fetch<string[]>(caseStudySlugsQuery);
    const merged = new Set([...localSlugs, ...(slugs ?? []).filter(Boolean)]);
    return Array.from(merged);
  } catch (err) {
    console.error("[sanity] fetchCaseStudySlugs failed:", err);
    return localSlugs;
  }
}

export async function fetchAllCaseStudySummaries() {
  if (!isSanityConfigured()) {
    return Object.values(LOCAL_FALLBACKS).map((s) => ({
      slug: s.slug,
      headline: s.headline,
      categoryTags: s.categoryTags,
      seoTitle: s.seo.title,
    }));
  }

  try {
    const client = getSanityClient();
    if (!client) return [];
    return await client.fetch(allCaseStudiesQuery);
  } catch (err) {
    console.error("[sanity] fetchAllCaseStudySummaries failed:", err);
    return [];
  }
}

type SanityTechnologyDoc = {
  _id: string;
  name: string;
  slug: string | null;
  logoUrl: string | null;
};

/** Published technologies for the cybersecurity partner logo strip. */
export async function fetchTechnologies(): Promise<TechnologyLogo[]> {
  if (!isSanityConfigured()) return LOCAL_TECHNOLOGY_LOGOS;

  try {
    const client = getSanityClient();
    if (!client) return LOCAL_TECHNOLOGY_LOGOS;

    const docs = await client.fetch<SanityTechnologyDoc[]>(technologiesQuery);
    const mapped = (docs ?? [])
      .filter((doc) => Boolean(doc.logoUrl && doc.name))
      .map((doc) => ({
        name: doc.name,
        slug:
          doc.slug ||
          doc.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        logoUrl: doc.logoUrl as string,
      }));

    return mapped.length > 0 ? mapped : LOCAL_TECHNOLOGY_LOGOS;
  } catch (err) {
    console.error("[sanity] fetchTechnologies failed:", err);
    return LOCAL_TECHNOLOGY_LOGOS;
  }
}

export type { TechnologyLogo };
