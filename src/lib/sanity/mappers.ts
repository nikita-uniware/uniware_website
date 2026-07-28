import type { CaseStudy } from "@/content/case-studies/chemical-manufacturing";
import {
  portableTextBlocksToParagraphs,
  portableTextToBoldMarkdown,
} from "./portableText";

type PortableBlock = {
  _type?: string;
  children?: { _type?: string; text?: string; marks?: string[] }[];
  markDefs?: { _key?: string; _type?: string }[];
};

/** Raw shape returned by caseStudyBySlugQuery */
export type SanityCaseStudyDoc = {
  slug: string | null;
  categoryTags?: string[] | null;
  headline?: string | null;
  subtext?: PortableBlock[] | string | null;
  stats?: { number?: string | null; label?: string | null }[] | null;
  overview?: {
    heading?: string | null;
    description?: PortableBlock[] | string | null;
    location?: string | null;
    timeline?: string | null;
    deliveredBy?: string | null;
    technologies?: { name?: string | null; type?: string | null }[] | null;
  } | null;
  problem?: {
    heading?: string | null;
    body?: PortableBlock[] | null;
  } | null;
  solution?: {
    heading?: string | null;
    body?: PortableBlock[] | string | null;
    showSteps?: boolean | null;
    steps?: { title?: string | null; body?: string | null }[] | null;
    showTechnologies?: boolean | null;
    technologies?: { name?: string | null; type?: string | null }[] | null;
  } | null;
  beforeAfter?: {
    heading?: string | null;
    rows?: {
      metric?: string | null;
      before?: string | null;
      after?: string | null;
    }[] | null;
  } | null;
  results?: {
    heading?: string | null;
    outcomes?: (string | null)[] | null;
  } | null;
  showNote?: boolean | null;
  note?: {
    source?: "client" | "team" | string | null;
    quote?: PortableBlock[] | string | null;
    name?: string | null;
    designation?: string | null;
    company?: string | null;
  } | null;
  whatsNext?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  ogImageUrl?: string | null;
};

function mapTechs(
  list: { name?: string | null; type?: string | null }[] | null | undefined
) {
  return (list ?? [])
    .filter((t) => t?.name)
    .map((t) => ({
      name: String(t.name),
      ...(t.type ? { type: String(t.type) } : {}),
    }));
}

/**
 * Maps a Sanity caseStudy document into the CaseStudy shape used by CaseStudyPage.
 * Returns null if required fields are missing.
 */
export function mapSanityCaseStudy(doc: SanityCaseStudyDoc | null): CaseStudy | null {
  if (!doc?.slug || !doc.headline) return null;

  const stats = (doc.stats ?? [])
    .filter((s) => s?.number && s?.label)
    .map((s) => ({ number: String(s!.number), label: String(s!.label) }));

  if (stats.length < 3) return null;

  const overview = doc.overview;
  const problem = doc.problem;
  const solution = doc.solution;
  const beforeAfter = doc.beforeAfter;
  const results = doc.results;

  const overviewDescription = portableTextToBoldMarkdown(
    overview?.description as PortableBlock[] | string | null | undefined
  );
  const problemBody = portableTextBlocksToParagraphs(problem?.body ?? undefined);
  const solutionBody = portableTextToBoldMarkdown(
    solution?.body as PortableBlock[] | string | null | undefined
  );

  if (
    !overview?.heading ||
    !overviewDescription ||
    !overview.location ||
    !overview.deliveredBy ||
    !problem?.heading ||
    !solution?.heading ||
    !beforeAfter?.heading ||
    !results?.heading
  ) {
    return null;
  }

  if (problemBody.length === 0) return null;

  const study: CaseStudy = {
    slug: doc.slug,
    categoryTags: (doc.categoryTags ?? []).filter(Boolean).map(String),
    headline: doc.headline,
    subtext: portableTextToBoldMarkdown(
      doc.subtext as PortableBlock[] | string | null | undefined
    ),
    stats,
    overview: {
      heading: overview.heading,
      description: overviewDescription,
      location: overview.location,
      ...(overview.timeline ? { timeline: overview.timeline } : {}),
      deliveredBy: overview.deliveredBy,
      technologies: mapTechs(overview.technologies),
    },
    problem: {
      heading: problem.heading,
      body: problemBody,
    },
    solution: {
      heading: solution.heading,
      body: solutionBody,
      showSteps: Boolean(solution.showSteps),
      steps: (solution.steps ?? [])
        .filter((s) => s?.title && s?.body)
        .map((s) => ({ title: String(s!.title), body: String(s!.body) })),
      showTechnologies: Boolean(solution.showTechnologies),
      technologies: mapTechs(solution.technologies),
    },
    beforeAfter: {
      heading: beforeAfter.heading,
      rows: (beforeAfter.rows ?? [])
        .filter((r) => r?.metric && r?.before && r?.after)
        .map((r) => ({
          metric: String(r!.metric),
          before: String(r!.before),
          after: String(r!.after),
        })),
    },
    results: {
      heading: results.heading,
      outcomes: (results.outcomes ?? []).filter(Boolean).map(String),
    },
    seo: {
      title: doc.seoTitle ?? doc.headline,
      description: doc.metaDescription ?? "",
      ...(doc.ogImageUrl ? { ogImageUrl: doc.ogImageUrl } : {}),
    },
  };

  if (doc.showNote && doc.note?.name) {
    const quote = portableTextToBoldMarkdown(
      doc.note.quote as PortableBlock[] | string | null | undefined
    );
    if (quote) {
      const source =
        doc.note.source === "client" || doc.note.source === "team"
          ? doc.note.source
          : "team";
      study.note = {
        source,
        quote,
        name: doc.note.name,
        designation: doc.note.designation ?? "",
        company: doc.note.company ?? "",
      };
    }
  }

  if (doc.whatsNext) {
    study.whatsNext = doc.whatsNext;
  }

  return study;
}
