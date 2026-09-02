import type {
  CaseStudy,
  CaseStudyNote,
  SolutionContentBlock,
} from "@/content/case-studies/chemical-manufacturing";
import type { CaseStudyPortableTextBlock } from "./portableText";
import { portableTextToBoldMarkdown } from "./portableText";

type PortableBlock = CaseStudyPortableTextBlock;

type SanityTech = {
  name?: string | null;
  type?: string | null;
  logoUrl?: string | null;
};

type SanityNoteQuote = {
  source?: "client" | "team" | string | null;
  quote?: PortableBlock[] | string | null;
  name?: string | null;
  designation?: string | null;
  company?: string | null;
};

type SanityNoteSlot = {
  show?: boolean | null;
  quotes?: SanityNoteQuote[] | null;
};

type SanityContentBlock = {
  _type?: string | null;
  _key?: string | null;
  body?: PortableBlock[] | string | null;
  alt?: string | null;
  caption?: string | null;
  imageUrl?: string | null;
  muxPlaybackId?: string | null;
  fileUrl?: string | null;
  posterUrl?: string | null;
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
  } | null;
  problem?: {
    heading?: string | null;
    body?: PortableBlock[] | null;
  } | null;
  solution?: {
    heading?: string | null;
    body?: PortableBlock[] | string | null;
    contentBlocks?: SanityContentBlock[] | null;
    showSteps?: boolean | null;
    steps?: { title?: string | null; body?: string | null }[] | null;
    showTechnologies?: boolean | null;
    technologies?: SanityTech[] | null;
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
  noteAfterProblem?: SanityNoteSlot | null;
  additionalSection?: {
    show?: boolean | null;
    heading?: string | null;
    body?: PortableBlock[] | null;
  } | null;
  noteAfterSolution?: SanityNoteSlot | null;
  noteAfterResults?: SanityNoteSlot | null;
  showNote?: boolean | null;
  note?: SanityNoteQuote | null;
  whatsNext?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  ogImageUrl?: string | null;
  thumbnailIconOverride?: string | null;
};

function mapTechs(list: SanityTech[] | null | undefined) {
  return (list ?? [])
    .filter((t) => t?.name)
    .map((t) => ({
      name: String(t.name),
      ...(t.type ? { type: String(t.type) } : {}),
      ...(t.logoUrl ? { logoUrl: String(t.logoUrl) } : {}),
    }));
}

function mapNoteQuote(raw: SanityNoteQuote | null | undefined): CaseStudyNote | null {
  if (!raw?.name) return null;
  const quote = portableTextToBoldMarkdown(
    raw.quote as PortableBlock[] | string | null | undefined
  );
  if (!quote) return null;
  const source =
    raw.source === "client" || raw.source === "team" ? raw.source : "team";
  return {
    source,
    quote,
    name: raw.name,
    designation: raw.designation ?? "",
    company: raw.company ?? "",
  };
}

function mapNoteSlot(
  slot: SanityNoteSlot | null | undefined,
  legacy?: { show?: boolean | null; note?: SanityNoteQuote | null }
): CaseStudyNote[] {
  if (slot?.show) {
    return (slot.quotes ?? [])
      .map((q) => mapNoteQuote(q))
      .filter((q): q is CaseStudyNote => Boolean(q));
  }
  if (legacy?.show && legacy.note) {
    const mapped = mapNoteQuote(legacy.note);
    return mapped ? [mapped] : [];
  }
  return [];
}

function mapContentBlocks(
  blocks: SanityContentBlock[] | null | undefined
): SolutionContentBlock[] {
  const out: SolutionContentBlock[] = [];
  for (const block of blocks ?? []) {
    if (block._type === "solutionText") {
      const body = block.body as PortableBlock[] | null | undefined;
      if (body?.length) out.push({ type: "text", body });
      continue;
    }
    if (block._type === "solutionImage" && block.imageUrl) {
      out.push({
        type: "image",
        src: block.imageUrl,
        alt: block.alt?.trim() || "Case study image",
        ...(block.caption?.trim() ? { caption: block.caption.trim() } : {}),
      });
      continue;
    }
    if (block._type === "solutionVideo") {
      // Still image stays above the player as a separate figure.
      if (block.posterUrl) {
        out.push({
          type: "image",
          src: block.posterUrl,
          alt: block.alt?.trim() || block.caption?.trim() || "Case study image",
        });
      }
      // Prefer Mux adaptive stream; fall back to legacy Sanity CDN MP4.
      if (block.muxPlaybackId) {
        out.push({
          type: "muxVideo",
          playbackId: block.muxPlaybackId,
          ...(block.caption?.trim() ? { caption: block.caption.trim() } : {}),
        });
      } else if (block.fileUrl) {
        out.push({
          type: "video",
          src: block.fileUrl,
          ...(block.caption?.trim() ? { caption: block.caption.trim() } : {}),
        });
      }
    }
  }
  return out;
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
  const problemBody = (problem?.body ?? []) as PortableBlock[];
  const solutionBody = (solution?.body ?? []) as PortableBlock[];

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

  const technologies = mapTechs(solution.technologies);

  const study: CaseStudy = {
    slug: doc.slug,
    categoryTags: (doc.categoryTags ?? []).filter(Boolean).map(String),
    headline: doc.headline,
    subtext: portableTextToBoldMarkdown(
      doc.subtext as PortableBlock[] | string | null | undefined
    ),
    stats,
    ...(doc.thumbnailIconOverride?.trim()
      ? { thumbnailIconOverride: doc.thumbnailIconOverride.trim() }
      : {}),
    overview: {
      heading: overview.heading,
      description: overviewDescription,
      location: overview.location,
      ...(overview.timeline ? { timeline: overview.timeline } : {}),
      deliveredBy: overview.deliveredBy,
    },
    problem: {
      heading: problem.heading,
      body: problemBody,
    },
    solution: {
      heading: solution.heading,
      body: solutionBody,
      contentBlocks: mapContentBlocks(solution.contentBlocks),
      showSteps: Boolean(solution.showSteps),
      steps: (solution.steps ?? [])
        .filter((s) => s?.title && s?.body)
        .map((s) => ({ title: String(s!.title), body: String(s!.body) })),
      showTechnologies: Boolean(solution.showTechnologies),
      technologies,
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
    notesAfterProblem: mapNoteSlot(doc.noteAfterProblem),
    notesAfterSolution: mapNoteSlot(doc.noteAfterSolution),
    notesAfterResults: mapNoteSlot(doc.noteAfterResults, {
      show: doc.showNote,
      note: doc.note,
    }),
    seo: {
      title: doc.seoTitle ?? doc.headline,
      description: doc.metaDescription ?? "",
      ...(doc.ogImageUrl ? { ogImageUrl: doc.ogImageUrl } : {}),
    },
  };

  if (doc.whatsNext) {
    study.whatsNext = doc.whatsNext;
  }

  const additional = doc.additionalSection;
  if (additional?.show && (additional.body?.length ?? 0) > 0) {
    study.additionalSection = {
      ...(additional.heading?.trim()
        ? { heading: additional.heading.trim() }
        : {}),
      body: additional.body as PortableBlock[],
    };
  }

  return study;
}
