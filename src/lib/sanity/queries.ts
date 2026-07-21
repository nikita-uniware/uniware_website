/**
 * GROQ queries for case studies (content model v3).
 */

const portableBlockProjection = `{
  _type,
  children[]{ _type, text, marks },
  markDefs[]{ _key, _type }
}`;

export const caseStudySlugsQuery = `*[_type == "caseStudy" && defined(slug.current)][].slug.current`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0]{
  "slug": slug.current,
  categoryTags,
  headline,
  subtext[]${portableBlockProjection},
  stats[]{ number, label },
  overview{
    heading,
    description[]${portableBlockProjection},
    location,
    timeline,
    deliveredBy,
    technologies[]{
      "name": technology->name,
      type
    }
  },
  problem{
    heading,
    body[]${portableBlockProjection}
  },
  solution{
    heading,
    body[]${portableBlockProjection},
    showSteps,
    steps[]{ title, body },
    showTechnologies,
    technologies[]{
      "name": technology->name,
      type
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

export const allCaseStudiesQuery = `*[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc){
  "slug": slug.current,
  headline,
  categoryTags,
  "seoTitle": seoTitle
}`;

/** Published technologies with a logo — used by the cybersecurity partner strip. */
export const technologiesQuery = `*[_type == "technology" && defined(name) && defined(logo.asset)] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  "logoUrl": logo.asset->url
}`;
