"use client";

import { useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Cybersecurity page interactions from the reference HTML script.
 */
export function useCyberPageBehaviors() {
  useReveal({ heroSelector: ".hero" });

  useEffect(() => {
    const tabs = document.querySelectorAll(".subnav-tab");
    const sids = [
      "our-approach",
      "prevention",
      "recovery",
      "where-to-start",
      "client-stories",
    ];
    const sels = sids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observers: IntersectionObserver[] = [];

    if (sels.length && window.IntersectionObserver) {
      sels.forEach((el) => {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              tabs.forEach((t) => {
                const on = t.getAttribute("href") === `#${e.target.id}`;
                t.classList.toggle("is-active", on);
                if (on) t.setAttribute("aria-current", "location");
                else t.removeAttribute("aria-current");
              });
            });
          },
          { rootMargin: "-30% 0px -60% 0px" }
        );
        obs.observe(el);
        observers.push(obs);
      });
    }

    const TRIGGER_LINE = 0.65;
    let lineEls = Array.from(document.querySelectorAll("[data-line]"));
    let lineTicking = false;

    function lineCheck() {
      lineTicking = false;
      const line = window.innerHeight * TRIGGER_LINE;
      lineEls = lineEls.filter((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > line) return true;
        el.classList.add("line-visible");
        return false;
      });
    }

    function lineOnScroll() {
      if (lineTicking) return;
      lineTicking = true;
      requestAnimationFrame(lineCheck);
    }

    window.addEventListener("scroll", lineOnScroll, { passive: true });
    window.addEventListener("resize", lineOnScroll);
    lineCheck();

    const crossObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const h = entry.target.querySelector(".crossbar-h");
          const dl = entry.target.querySelector(".crossbar-dl");
          const dr = entry.target.querySelector(".crossbar-dr");
          h?.classList.add("line-visible");
          dl?.classList.add("line-visible");
          dr?.classList.add("line-visible");
          const cont =
            entry.target.closest(".container") || entry.target.parentNode;
          window.setTimeout(() => {
            cont
              ?.querySelectorAll(".crossbar-reveal")
              .forEach((c) => c.classList.add("is-visible"));
          }, 1200);
          crossObs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );

    document.querySelectorAll("[data-crossbar]").forEach((el) => {
      crossObs.observe(el);
    });

    const wtsRingsEl = document.getElementById("wts-rings");
    let wtsOnScroll: (() => void) | null = null;
    if (wtsRingsEl) {
      const wtsCards = Array.from(
        document.querySelectorAll("[data-ring-trigger]")
      );
      let wtsTicking = false;
      let wtsCurrentLevel: string | null = null;

      function wtsUpdate() {
        wtsTicking = false;
        const refLine = window.innerHeight * 0.45;
        let closest: Element | null = null;
        let closestDist = Infinity;
        wtsCards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - refLine);
          if (dist < closestDist) {
            closestDist = dist;
            closest = card;
          }
        });
        if (!closest) return;
        const level = (closest as Element).getAttribute("data-ring-trigger");
        if (level === wtsCurrentLevel) return;
        wtsCurrentLevel = level;
        wtsRingsEl!.querySelectorAll(".wts-ring").forEach((r) => {
          r.classList.toggle(
            "is-current",
            r.getAttribute("data-ring") === level
          );
        });
        wtsCards.forEach((c) => {
          c.classList.toggle(
            "is-current",
            c.getAttribute("data-ring-trigger") === level
          );
        });
      }

      wtsOnScroll = () => {
        if (wtsTicking) return;
        wtsTicking = true;
        requestAnimationFrame(wtsUpdate);
      };

      window.addEventListener("scroll", wtsOnScroll, { passive: true });
      window.addEventListener("resize", wtsOnScroll);
      wtsUpdate();
    }

    const arrowHandlers: Array<{
      btn: Element;
      handler: EventListener;
    }> = [];

    document.querySelectorAll(".arrow-btn").forEach((btn) => {
      const handler = () => {
        const carousel = document.getElementById(
          btn.getAttribute("data-carousel-target") || ""
        );
        if (!carousel) return;
        const dir = parseInt(btn.getAttribute("data-dir") || "1", 10);
        const tile = carousel.querySelector(".tile-prev, .tile-rec") as
          | HTMLElement
          | null;
        carousel.scrollBy({
          left: dir * (tile ? tile.offsetWidth + 10 : 290),
          behavior: "smooth",
        });
      };
      btn.addEventListener("click", handler);
      arrowHandlers.push({ btn, handler });
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      crossObs.disconnect();
      window.removeEventListener("scroll", lineOnScroll);
      window.removeEventListener("resize", lineOnScroll);
      if (wtsOnScroll) {
        window.removeEventListener("scroll", wtsOnScroll);
        window.removeEventListener("resize", wtsOnScroll);
      }
      arrowHandlers.forEach(({ btn, handler }) =>
        btn.removeEventListener("click", handler)
      );
    };
  }, []);
}
