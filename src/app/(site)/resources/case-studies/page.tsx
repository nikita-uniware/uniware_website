import type { Metadata } from "next";
import { CaseStudiesIndexPage } from "@/components/pages/CaseStudiesIndexPage";
import { fetchCaseStudyCards } from "@/lib/sanity";
import {
  CATEGORY_SLUG_BY_TAG,
  categorySlugToTag,
} from "@/lib/sanity/categorySlug";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Uniware Systems case studies.",
};

/**
 * Case studies listing page — Sections 1 (hero), 2 (category filter) and
 * 3 (grid/cards) so far. Generated thumbnail (spec Section 6) lands as
 * its own step.
 * Route: /resources/case-studies
 * Individual studies remain at /resources/case-studies/[slug].
 */
export default async function CaseStudiesIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const cards = await fetchCaseStudyCards();
  const presentTags = new Set(cards.flatMap((c) => c.categoryTags));

  // Canonical tag order (from the slug map), filtered to tags that
  // actually appear on at least one published case study.
  const categories = Object.keys(CATEGORY_SLUG_BY_TAG).filter((tag) =>
    presentTags.has(tag)
  );

  const activeTag = category ? categorySlugToTag(category) : null;
  const activeCategorySlug =
    activeTag && categories.includes(activeTag) ? category! : "all";

  const visibleCards =
    activeCategorySlug === "all"
      ? cards
      : cards.filter((c) => activeTag && c.categoryTags.includes(activeTag));

  return (
    <CaseStudiesIndexPage
      categories={categories}
      activeCategorySlug={activeCategorySlug}
      cards={visibleCards}
    />
  );
}
