"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { categoryTagToSlug } from "@/lib/sanity/categorySlug";
import "@/styles/case-studies-index.page.css";

type CaseStudiesIndexPageProps = {
  /** Category tags with at least one published case study, canonical order. */
  categories: string[];
  /** "all" or a category URL slug — whichever tab is currently active. */
  activeCategorySlug: string;
};

/**
 * Case studies index — /resources/case-studies
 * Sections 1 (hero) + 2 (category filter) so far. Grid/cards/thumbnail
 * land later.
 */
export function CaseStudiesIndexPage({
  categories,
  activeCategorySlug,
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
    </div>
  );
}
