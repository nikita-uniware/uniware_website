"use client";

import { useEffect, useRef } from "react";

type UseScrollSyncHighlightOptions = {
  /** Selector for the scroll-tracked elements, e.g. "[data-ring-trigger]". */
  triggerSelector: string;
  /** Bare attribute name (no "data-" prefix) holding each trigger's key. */
  triggerAttr: string;
  /** Optional companion elements synced by the same key, e.g. decorative rings. */
  companionSelector?: string;
  /** Bare attribute name (no "data-" prefix) holding each companion's key. */
  companionAttr?: string;
  /** Fraction of viewport height used as the reference line. */
  lineRatio?: number;
  /** CSS class toggled on the active trigger/companion elements. */
  activeClass?: string;
  /**
   * Default (false): always activate whichever trigger is closest to the
   * reference line — correct when triggers fill the whole scrollable
   * region contiguously (e.g. "Where to Start").
   * true: only activate a trigger when the reference line actually falls
   * within that trigger's own bounds. When no trigger contains the line,
   * nothing is active. Use this when there's a legitimate gap before/
   * between triggers where nothing should be highlighted.
   */
  requireIntersection?: boolean;
};

type ScrollSyncHighlightHandle = {
  /** Imperatively force a given key active, e.g. from a click handler. */
  setActive: (key: string) => void;
};

/**
 * Scroll-position-driven highlight sync: whichever trigger element sits
 * closest to lineRatio of the viewport gets activeClass, along with any
 * companion element sharing the same key. Extracted from the "Where to
 * Start" ring/card sync (useCyberPageBehaviors) so it can be reused
 * elsewhere with a different selector/attribute pair.
 */
export function useScrollSyncHighlight({
  triggerSelector,
  triggerAttr,
  companionSelector,
  companionAttr,
  lineRatio = 0.45,
  activeClass = "is-current",
  requireIntersection = false,
}: UseScrollSyncHighlightOptions): ScrollSyncHighlightHandle {
  const setActiveRef = useRef<(key: string) => void>(() => {});

  useEffect(() => {
    const triggers = Array.from(document.querySelectorAll(triggerSelector));
    if (triggers.length === 0) return;

    const companions = companionSelector
      ? Array.from(document.querySelectorAll(companionSelector))
      : [];

    let ticking = false;
    // undefined = not yet resolved (so the first real computation always
    // applies, even if it resolves to null/"nothing").
    let currentKey: string | null | undefined;

    function applyKey(key: string | null) {
      if (key === currentKey) return;
      currentKey = key;
      companions.forEach((el) => {
        el.classList.toggle(
          activeClass,
          key !== null && el.getAttribute(`data-${companionAttr}`) === key
        );
      });
      triggers.forEach((el) => {
        el.classList.toggle(
          activeClass,
          key !== null && el.getAttribute(`data-${triggerAttr}`) === key
        );
      });
    }

    function update() {
      ticking = false;
      const line = window.innerHeight * lineRatio;

      if (requireIntersection) {
        const match = triggers.find((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top <= line && rect.bottom >= line;
        });
        applyKey(match ? match.getAttribute(`data-${triggerAttr}`) : null);
        return;
      }

      let closest: Element | null = null;
      let closestDist = Infinity;
      triggers.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - line);
        if (dist < closestDist) {
          closestDist = dist;
          closest = el;
        }
      });
      if (!closest) return;
      applyKey((closest as Element).getAttribute(`data-${triggerAttr}`));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    setActiveRef.current = (key: string) => applyKey(key);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [
    triggerSelector,
    triggerAttr,
    companionSelector,
    companionAttr,
    lineRatio,
    activeClass,
    requireIntersection,
  ]);

  return {
    setActive: (key: string) => setActiveRef.current(key),
  };
}
