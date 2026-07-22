"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteNav() {
  const pathname = usePathname();
  const onContact =
    pathname === "/contact" || pathname.startsWith("/contact/");

  return (
    <header
      className="site-nav bg-linear-90 from-uw-dark-blue to-uw-black"
      role="banner"
    >
      <div className="site-nav-inner">
        <Link href="/" className="site-nav-logo" aria-label="Uniware Systems — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-mark.svg"
            alt="Uniware Systems"
            className="site-nav-logo-mark"
            height={32}
            width={32}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-wordmark.svg"
            alt="Uniware Systems"
            className="site-nav-logo-word"
            height={28}
            width={140}
          />
        </Link>
        <nav className="site-nav-links" aria-label="Main navigation">
          <Link href="/solutions/cybersecurity" className="site-nav-link">
            Cybersecurity
          </Link>
          <Link href="/resources/case-studies" className="site-nav-link">
            Case studies
          </Link>
          <Link
            href="/contact"
            className={
              onContact ? "site-nav-cta site-nav-cta--secondary" : "site-nav-cta"
            }
            aria-current={onContact ? "page" : undefined}
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
