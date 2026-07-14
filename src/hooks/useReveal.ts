"use client";

import { useEffect } from "react";

const TRIGGER_LINE = 0.65;

type UseRevealOptions = {
  /** CSS selector for the hero container. Hero [data-reveal] fade in on load. */
  heroSelector?: string;
};

/**
 * Position-based scroll reveal (not IntersectionObserver).
 * Progressive enhancement: without JS, content stays visible (no opacity:0 default).
 * Hero always reveals on load. Footer should never carry data-reveal.
 */
export function useReveal({ heroSelector = ".hero" }: UseRevealOptions = {}) {
  useEffect(() => {
    document.documentElement.classList.add("is-ready");

    const heroEls = Array.from(
      document.querySelectorAll(`${heroSelector} [data-reveal]`)
    );
    heroEls.forEach((el) => {
      const delay = parseInt(el.getAttribute("data-reveal") || "0", 10) || 0;
      (el as HTMLElement).style.setProperty("--reveal-delay", `${delay}ms`);
      el.classList.add("is-visible");
    });

    let revealEls = Array.from(document.querySelectorAll("[data-reveal]")).filter(
      (el) => !el.closest(heroSelector)
    );
    let ticking = false;

    function check() {
      ticking = false;
      const line = window.innerHeight * TRIGGER_LINE;
      revealEls = revealEls.filter((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > line) return true;
        const delay = parseInt(el.getAttribute("data-reveal") || "0", 10) || 0;
        (el as HTMLElement).style.setProperty("--reveal-delay", `${delay}ms`);
        el.classList.add("is-visible");
        return false;
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroSelector]);
}
