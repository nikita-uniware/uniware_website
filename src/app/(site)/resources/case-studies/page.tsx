import type { Metadata } from "next";
import { CaseStudiesIndexPage } from "@/components/pages/CaseStudiesIndexPage";
import { fetchAllCaseStudySummaries } from "@/lib/sanity";
import {
  CATEGORY_SLUG_BY_TAG,
  categorySlugToTag,
} from "@/lib/sanity/categorySlug";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Uniware Systems case studies.",
};

/**
 * Case studies listing page — Sections 1 (hero) + 2 (category filter) so
 * far. Grid/cards/thumbnail land in later sections of this build.
 * Route: /resources/case-studies
 * Individual studies remain at /resources/case-studies/[slug].
 */
export default async function CaseStudiesIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const summaries = await fetchAllCaseStudySummaries();
  const presentTags = new Set(
    summaries.flatMap((s: { categoryTags?: string[] | null }) =>
      Array.isArray(s.categoryTags) ? s.categoryTags : []
    )
  );

  // Canonical tag order (from the slug map), filtered to tags that
  // actually appear on at least one published case study.
  const categories = Object.keys(CATEGORY_SLUG_BY_TAG).filter((tag) =>
    presentTags.has(tag)
  );

  const activeTag = category ? categorySlugToTag(category) : null;
  const activeCategorySlug =
    activeTag && categories.includes(activeTag) ? category! : "all";

  return (
    <CaseStudiesIndexPage
      categories={categories}
      activeCategorySlug={activeCategorySlug}
    />
  );
}
