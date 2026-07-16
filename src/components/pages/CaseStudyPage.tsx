"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import {
  type CaseStudy,
  renderBoldOnly,
} from "@/content/case-studies/chemical-manufacturing";
import { CircleGroup } from "@/components/CircleGroup";
import "@/styles/case-study.page.css";

function OverviewCard({ study }: { study: CaseStudy }) {
  const { overview } = study;
  return (
    <div className="cs-overview-card" data-reveal="0">
      <div className="cs-overview-head">
        <p className="cs-overview-eyebrow">Client overview</p>
        <p className="cs-overview-title">{overview.heading}</p>
        <p className="cs-overview-description">{overview.description}</p>
      </div>
      <div className="cs-overview-row">
        <span className="cs-overview-label">Location</span>
        <span className="cs-overview-value">{overview.location}</span>
      </div>
      {overview.timeline ? (
        <div className="cs-overview-row">
          <span className="cs-overview-label">Timeline</span>
          <span className="cs-overview-value">{overview.timeline}</span>
        </div>
      ) : null}
      <div className="cs-overview-row">
        <span className="cs-overview-label">Delivered by</span>
        <span className="cs-overview-value">{overview.deliveredBy}</span>
      </div>
      <div className="cs-stack-mini">
        <p className="cs-stack-mini-label">Technologies used</p>
        {overview.technologies.map((t) => (
          <p className="cs-stack-mini-item" key={t.name}>
            <strong>{t.name}</strong>
            {t.type ? ` - ${t.type}` : ""}
          </p>
        ))}
      </div>
    </div>
  );
}

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  useReveal({ heroSelector: ".cs-hero" });

  const statCols = study.stats.length;
  const noteHeading =
    study.note?.source === "client"
      ? "A note from our client"
      : "A note from our team";

  return (
    <div className="case-study-page">
      <section className="cs-hero">
        <div className="container">
          <Link href="/resources/case-studies" className="back-link">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All case studies
          </Link>
          <div className="cs-tags" data-reveal="0">
            {study.categoryTags.map((tag) => (
              <span className="cs-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="cs-hero-headline" data-reveal="80">
            {study.headline}
          </h1>
          <p className="cs-hero-sub" data-reveal="160">
            {study.subtext}
          </p>
        </div>
      </section>

      <section
        className="cs-stat-strip"
        data-stat-count={statCols}
        aria-label="Key results"
      >
        <div className="container">
          <div
            className="cs-hero-stats"
            style={{ "--stat-cols": statCols } as CSSProperties}
          >
            {study.stats.map((stat, i) => (
              <div
                className="cs-hero-stat-cell"
                data-reveal={String(i * 80)}
                key={stat.label}
              >
                <div className="cs-hero-stat-number">{stat.number}</div>
                <div className="cs-hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <CircleGroup
          size="sm"
          surface="light"
          position="bottom-right"
          className="circle-group"
        />
      </section>

      <section className="cs-report">
        <div className="container">
          <div className="cs-report-grid">
            <div className="cs-sidebar-mobile">
              <OverviewCard study={study} />
            </div>

            <aside className="cs-sidebar">
              <OverviewCard study={study} />
            </aside>

            <div className="cs-main">
              <div className="cs-block">
                <p className="cs-eyebrow" data-reveal="0">
                  The problem
                </p>
                <h2 className="cs-h2" data-reveal="80">
                  {study.problem.heading}
                </h2>
                {study.problem.body.map((para, i) => (
                  <p
                    className="cs-block-body"
                    data-reveal={String(160 + i * 80)}
                    key={i}
                  >
                    {renderBoldOnly(para)}
                  </p>
                ))}
              </div>

              <div className="cs-block">
                <p className="cs-eyebrow" data-reveal="0">
                  The solution
                </p>
                <h2 className="cs-h2" data-reveal="80">
                  {study.solution.heading}
                </h2>
                <p className="cs-block-body" data-reveal="160">
                  {renderBoldOnly(study.solution.body)}
                </p>

                {study.solution.showSteps && study.solution.steps.length > 0 ? (
                  <ol className="cs-timeline" data-reveal="220">
                    {study.solution.steps.map((step, i) => (
                      <li className="cs-timeline-item" key={step.title}>
                        <div className="cs-timeline-marker-col">
                          <div className="cs-timeline-marker">{i + 1}</div>
                        </div>
                        <div>
                          <div className="cs-timeline-title">{step.title}</div>
                          <div className="cs-timeline-body">{step.body}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : null}

                {study.solution.showTechnologies &&
                study.solution.technologies.length > 0 ? (
                  <>
                    <p className="cs-tech-label">Technologies used</p>
                    <div className="cs-stack" data-reveal="280">
                      {study.solution.technologies.map((t) => (
                        <span className="cs-stack-chip" key={t.name}>
                          <span className="cs-stack-chip-logo">{t.name}</span>
                          {t.type ? (
                            <span className="cs-stack-chip-qualifier">
                              {t.type}
                            </span>
                          ) : null}
                        </span>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="cs-block">
                <p className="cs-eyebrow" data-reveal="0">
                  Before and after
                </p>
                <h2 className="cs-h2" data-reveal="80">
                  {study.beforeAfter.heading}
                </h2>
                <table className="cs-table" data-reveal="160">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Before</th>
                      <th>After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {study.beforeAfter.rows.map((row) => (
                      <tr key={row.metric}>
                        <td>{row.metric}</td>
                        <td>{row.before}</td>
                        <td>{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cs-block">
                <p className="cs-eyebrow" data-reveal="0">
                  The results
                </p>
                <h2 className="cs-h2" data-reveal="80">
                  {study.results.heading}
                </h2>
                <ul className="cs-results" data-reveal="160">
                  {study.results.outcomes.map((outcome) => (
                    <li key={outcome}>
                      <CheckIcon />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {study.note ? (
                <div className="cs-block">
                  <p className="cs-eyebrow" data-reveal="0">
                    {noteHeading}
                  </p>
                  <div className="cs-quote-block" data-reveal="80">
                    <p className="cs-quote-block-text">{study.note.quote}</p>
                    <p className="cs-quote-block-name">{study.note.name}</p>
                    <p className="cs-quote-block-title">
                      {study.note.designation}, {study.note.company}
                    </p>
                  </div>
                </div>
              ) : null}

              {study.whatsNext ? (
                <div className="cs-block">
                  <div className="cs-next-inline" data-reveal="0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                    </svg>
                    <p className="cs-next-inline-body">
                      <strong>What&apos;s next.</strong> {study.whatsNext}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="cs-cta">
        <div className="container">
          <h2 className="cs-cta-h2" data-reveal="0">
            Facing something similar?
          </h2>
          <p className="cs-cta-body" data-reveal="80">
            Talk to the Uniware team about ransomware recovery and prevention,
            before an attack forces the conversation.
          </p>
          <Link href="/contact" className="btn-primary-amber" data-reveal="160">
            Book a Security Review
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
