"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const SOLUTIONS = [
  {
    href: "/solutions/cybersecurity",
    label: "Cybersecurity",
  },
  {
    href: "/solutions/data-centre-infrastructure",
    label: "Data Centre Infrastructure",
  },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const onContact =
    pathname === "/contact" || pathname.startsWith("/contact/");
  const onSolutions = pathname.startsWith("/solutions/");
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const menuId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!solutionsOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSolutionsOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSolutionsOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [solutionsOpen]);

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
          <div
            className={`site-nav-dropdown${solutionsOpen ? " is-open" : ""}`}
            ref={dropdownRef}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              className={`site-nav-link site-nav-dropdown-trigger${
                onSolutions ? " is-active" : ""
              }`}
              aria-expanded={solutionsOpen}
              aria-controls={menuId}
              aria-haspopup="menu"
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              Solutions
              <svg
                className="site-nav-dropdown-caret"
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 4.5L6 8l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              id={menuId}
              className="site-nav-dropdown-menu"
              role="menu"
              hidden={!solutionsOpen}
            >
              {SOLUTIONS.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`site-nav-dropdown-item${
                      active ? " is-active" : ""
                    }`}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link href="/resources/case-studies" className="site-nav-link">
            Case studies
          </Link>
          <Link
            href="/contact"
            className={
              onContact
                ? "btn-size-sm btn-surface-dark-ghost"
                : "btn-size-sm btn-surface-dark"
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
