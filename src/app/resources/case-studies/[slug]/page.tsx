import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/pages/CaseStudyPage";
import {
  fetchCaseStudyBySlug,
  fetchCaseStudySlugs,
} from "@/lib/sanity";

/** Refresh published Studio content without a full redeploy. */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await fetchCaseStudyBySlug(slug);
  if (!study) return {};

  const meta: Metadata = {
    title: study.seo.title,
    description: study.seo.description,
  };

  if (study.seo.ogImageUrl) {
    meta.openGraph = {
      title: study.seo.title,
      description: study.seo.description,
      images: [{ url: study.seo.ogImageUrl }],
    };
    meta.twitter = {
      card: "summary_large_image",
      title: study.seo.title,
      description: study.seo.description,
      images: [study.seo.ogImageUrl],
    };
  }

  return meta;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await fetchCaseStudyBySlug(slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
