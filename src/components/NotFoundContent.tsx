import Link from "next/link";
import { CircleGroup } from "@/components/CircleGroup";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 404 — matches design mock / solution-hub heroes:
 * dark gradient, small amber “404 ERROR” eyebrow, white + amber headline,
 * white primary CTA + ghost secondary, CircleGroup on the right.
 */
export function NotFoundContent() {
  return (
    <section
      className="not-found-page hero"
      aria-labelledby="not-found-heading"
    >
      <div className="container not-found-inner">
        <p className="hero-eyebrow">404 Error</p>
        <h1 className="hero-headline" id="not-found-heading">
          This page isn&apos;t here.
          <br />
          <span className="amber">Let&apos;s get you back.</span>
        </h1>
        <p className="hero-subtext not-found-sub">
          The link may be old, or the page may have moved. Head home, or get in
          touch if you need help finding something.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn-size-lg btn-surface-dark">
            Go to homepage
            <ArrowIcon />
          </Link>
          <Link href="/contact" className="btn-size-lg btn-surface-dark-ghost">
            Contact us
          </Link>
        </div>
      </div>
      <CircleGroup
        size="xl"
        surface="dark"
        position="bottom-right"
        enterAnimation
      />
    </section>
  );
}
