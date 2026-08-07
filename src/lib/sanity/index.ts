import { getSanityClient, isSanityConfigured } from "./client";
import {
  caseStudyBySlugQuery,
  caseStudyCardsQuery,
  caseStudySlugsQuery,
  technologiesByPageQuery,
} from "./queries";
import { mapSanityCaseStudy, type SanityCaseStudyDoc } from "./mappers";
import { portableTextToBoldMarkdown } from "./portableText";
import type { CaseStudy } from "@/content/case-studies/chemical-manufacturing";
import { chemicalManufacturingCaseStudy } from "@/content/case-studies/chemical-manufacturing";
import { vpnVulnerabilityCaseStudy } from "@/content/case-studies/vpn-vulnerability";
import {
  LOCAL_TECHNOLOGY_LOGOS,
  type TechnologyLogo,
} from "./partnerStrip";

/** Local fallback while Studio content is empty / unpublished. */
const LOCAL_FALLBACKS: Record<string, CaseStudy> = {
  [chemicalManufacturingCaseStudy.slug]: chemicalManufacturingCaseStudy,
  [vpnVulnerabilityCaseStudy.slug]: vpnVulnerabilityCaseStudy,
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
        if (mapped) {
          console.info(`[sanity] serving case study "${slug}" from CMS`);
          return mapped;
        }
        console.error(
          `[sanity] case study "${slug}" fetched but failed mapping — using local fallback`
        );
      }
    } catch (err) {
      console.error(
        `[sanity] fetchCaseStudyBySlug failed for "${slug}" — using local fallback:`,
        err
      );
    }
  }

  const local = LOCAL_FALLBACKS[slug] ?? null;
  if (local) {
    console.warn(`[sanity] serving case study "${slug}" from local fallback`);
  }
  return local;
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

export type CaseStudyCardSummary = {
  slug: string;
  headline: string;
  /** Bold-markdown text (renderBoldOnly-compatible), 1-2 sentence teaser. */
  subtext: string;
  categoryTags: string[];
  stat: { number: string; label: string } | null;
  thumbnailIconOverride?: string | null;
};

type SanityCaseStudyCardDoc = {
  slug: string;
  headline?: string | null;
  subtext?: unknown;
  categoryTags?: string[] | null;
  stat?: { number: string; label: string } | null;
  thumbnailIconOverride?: string | null;
};

/** Card list for /resources/case-studies (grid + category filter). */
export async function fetchCaseStudyCards(): Promise<CaseStudyCardSummary[]> {
  if (!isSanityConfigured()) {
    return Object.values(LOCAL_FALLBACKS).map((s) => ({
      slug: s.slug,
      headline: s.headline,
      subtext: s.subtext,
      categoryTags: s.categoryTags,
      stat: s.stats[0] ?? null,
      thumbnailIconOverride: s.thumbnailIconOverride ?? null,
    }));
  }

  try {
    const client = getSanityClient();
    if (!client) return [];
    const docs = await client.fetch<SanityCaseStudyCardDoc[]>(
      caseStudyCardsQuery
    );
    return (docs ?? [])
      .filter((doc) => Boolean(doc.slug))
      .map((doc) => ({
        slug: doc.slug,
        headline: doc.headline ?? "",
        subtext: portableTextToBoldMarkdown(
          doc.subtext as Parameters<typeof portableTextToBoldMarkdown>[0]
        ),
        categoryTags: (doc.categoryTags ?? []).filter(Boolean),
        stat: doc.stat ?? null,
        thumbnailIconOverride: doc.thumbnailIconOverride?.trim() || null,
      }));
  } catch (err) {
    console.error("[sanity] fetchCaseStudyCards failed:", err);
    return [];
  }
}

type SanityTechnologyDoc = {
  _id: string;
  name: string;
  slug: string | null;
  logoUrl: string | null;
  pages?: string[] | null;
};

export type TechnologyPageId = "cybersecurity";

/** Published technologies for a page partner strip (filtered by CMS `pages`). */
export async function fetchTechnologies(
  page: TechnologyPageId = "cybersecurity"
): Promise<TechnologyLogo[]> {
  if (!isSanityConfigured()) return LOCAL_TECHNOLOGY_LOGOS;

  try {
    const client = getSanityClient();
    if (!client) return LOCAL_TECHNOLOGY_LOGOS;

    const docs = await client.fetch<SanityTechnologyDoc[]>(
      technologiesByPageQuery,
      { page }
    );
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
