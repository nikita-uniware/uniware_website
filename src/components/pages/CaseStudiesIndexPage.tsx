"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { categoryTagToSlug } from "@/lib/sanity/categorySlug";
import {
  renderBoldOnly,
  type CaseStudyStat,
} from "@/content/case-studies/chemical-manufacturing";
import "@/styles/case-studies-index.page.css";

type CaseStudyCard = {
  slug: string;
  headline: string;
  subtext: string;
  categoryTags: string[];
  stat: CaseStudyStat | null;
};

type CaseStudiesIndexPageProps = {
  /** Category tags with at least one published case study, canonical order. */
  categories: string[];
  /** "all" or a category URL slug — whichever tab is currently active. */
  activeCategorySlug: string;
  /** Already filtered to the active category server-side. */
  cards: CaseStudyCard[];
};

/**
 * Case studies index — /resources/case-studies
 * Sections 1 (hero), 2 (category filter) and 3 (grid/cards) so far.
 * Generated thumbnail (spec Section 6) lands as its own step — cards
 * use a neutral placeholder in that slot for now.
 */
export function CaseStudiesIndexPage({
  categories,
  activeCategorySlug,
  cards,
}: CaseStudiesIndexPageProps) {
  useReveal();

  return (
    <div className="case-studies-index-page">
      <section className="hero" aria-labelledby="csi-hero-heading">
        <div className="container">
          <h1 className="hero-headline" data-reveal="0" id="csi-hero-heading">
            Case studies
          </h1>
          <p className="hero-subtext" data-reveal="80">
            From ransomware recovery to cloud migration to workplace
            modernisation, this is how Uniware&apos;s work plays out for real
            businesses.
          </p>
        </div>
        <div
          className="circle-group circle-group--lg uw-circles-lg"
          aria-hidden="true"
        >
          <div
            className="circle-enter"
            style={{ "--enter-delay": "0ms" } as CSSProperties}
          >
            <div className="circle-ring circle-lg-outer" data-circle="outer" />
          </div>
          <div
            className="circle-enter"
            style={{ "--enter-delay": "150ms" } as CSSProperties}
          >
            <div
              className="circle-ring circle-lg-middle"
              data-circle="middle"
            />
          </div>
          <div
            className="circle-enter"
            style={{ "--enter-delay": "300ms" } as CSSProperties}
          >
            <div className="circle-ring circle-lg-inner" data-circle="inner" />
          </div>
        </div>
      </section>

      <nav className="csi-filter" aria-label="Filter case studies by category">
        <div className="container">
          <ul className="csi-filter-list">
            <li>
              <Link
                href="/resources/case-studies"
                className={`csi-filter-tab${
                  activeCategorySlug === "all" ? " is-active" : ""
                }`}
                aria-current={activeCategorySlug === "all" ? "true" : undefined}
              >
                All
              </Link>
            </li>
            {categories.map((tag) => {
              const slug = categoryTagToSlug(tag);
              if (!slug) return null;
              const isActive = activeCategorySlug === slug;
              return (
                <li key={slug}>
                  <Link
                    href={`/resources/case-studies?category=${slug}`}
                    className={`csi-filter-tab${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {tag}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <section className="csi-grid-section">
        <div className="container">
          {cards.length === 0 ? (
            <p className="csi-empty">No case studies in this category yet.</p>
          ) : (
            <div className="csi-grid">
              {cards.map((study) => {
                const href = `/resources/case-studies/${study.slug}`;
                return (
                  <article className="csi-card" key={study.slug}>
                    <Link
                      href={href}
                      className="card-overlay-link"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                    <div
                      className="csi-thumbnail-placeholder"
                      aria-hidden="true"
                    />
                    <div className="csi-card-body">
                      {study.categoryTags[0] ? (
                        <span className="csi-tag-pill">
                          {study.categoryTags[0]}
                        </span>
                      ) : null}
                      <h3 className="csi-card-headline">{study.headline}</h3>
                      <p className="csi-card-subtext">
                        {renderBoldOnly(study.subtext)}
                      </p>
                      {study.stat ? (
                        <div className="csi-card-stat">
                          <div className="stat-number">
                            {study.stat.number}
                          </div>
                          <div className="stat-label">{study.stat.label}</div>
                        </div>
                      ) : null}
                      <div className="csi-card-cta card-cta">
                        <Link
                          href={href}
                          className="link-text link-text-light link-text-sm"
                        >
                          Read the case study
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M7 2.5L11.5 7M11.5 7L7 11.5M11.5 7H2.5" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
