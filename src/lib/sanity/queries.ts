/**
 * GROQ queries for case studies (content model v3).
 */

const portableBlockProjection = `{
  _type,
  children[]{ _type, text, marks },
  markDefs[]{ _key, _type }
}`;

export const caseStudySlugsQuery = `*[_type == "caseStudy" && defined(slug.current)][].slug.current`;

const noteSlotProjection = `{
  show,
  quotes[]{
    source,
    quote[]${portableBlockProjection},
    name,
    designation,
    company
  }
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0]{
  "slug": slug.current,
  categoryTags,
  headline,
  subtext[]${portableBlockProjection},
  stats[]{ number, label },
  thumbnailIconOverride,
  overview{
    heading,
    description[]${portableBlockProjection},
    location,
    timeline,
    deliveredBy
  },
  problem{
    heading,
    body[]${portableBlockProjection}
  },
  solution{
    heading,
    body[]${portableBlockProjection},
    contentBlocks[]{
      _type,
      _key,
      body[]${portableBlockProjection},
      alt,
      caption,
      "imageUrl": image.asset->url,
      "fileUrl": file.asset->url,
      "posterUrl": poster.asset->url
    },
    showSteps,
    steps[]{ title, body },
    showTechnologies,
    technologies[]{
      "name": technology->name,
      type,
      "logoUrl": technology->logo.asset->url
    }
  },
  beforeAfter{
    heading,
    rows[]{ metric, before, after }
  },
  results{
    heading,
    outcomes
  },
  noteAfterProblem${noteSlotProjection},
  noteAfterSolution${noteSlotProjection},
  noteAfterResults${noteSlotProjection},
  showNote,
  note{
    source,
    quote[]${portableBlockProjection},
    name,
    designation,
    company
  },
  whatsNext,
  "seoTitle": seoTitle,
  "metaDescription": metaDescription,
  "ogImageUrl": ogImage.asset->url
}`;

/**
 * Card list for /resources/case-studies (index grid + category filter).
 * Only stats[0] is fetched — whichever stat the editor lists first in
 * Studio is the one shown on the card, per the content model.
 */
export const caseStudyCardsQuery = `*[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc){
  "slug": slug.current,
  headline,
  subtext[]${portableBlockProjection},
  categoryTags,
  "stat": stats[0],
  thumbnailIconOverride
}`;

/** Technologies with a logo for a given website page (e.g. cybersecurity partner strip). */
export const technologiesByPageQuery = `*[_type == "technology" && defined(name) && defined(logo.asset) && $page in pages] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  "logoUrl": logo.asset->url,
  pages
}`;

/** Official vendor logos assigned to one or more Data Centre Infrastructure pillars. */
export const infrastructureTechnologiesQuery = `*[
  _type == "technology" &&
  defined(name) &&
  defined(logo.asset) &&
  "data-centre-infrastructure" in pages &&
  count(infrastructurePillars) > 0
] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  "logoUrl": logo.asset->url,
  infrastructurePillars
}`;
