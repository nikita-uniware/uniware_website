import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/pages/CaseStudyPage";
import { chemicalManufacturingCaseStudy } from "@/content/case-studies/chemical-manufacturing";

const studies = {
  [chemicalManufacturingCaseStudy.slug]: chemicalManufacturingCaseStudy,
};

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = studies[slug];
  if (!study) return {};
  return {
    title: study.seo.title,
    description: study.seo.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = studies[slug];
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
