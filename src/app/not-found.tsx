import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { NotFoundContent } from "@/components/NotFoundContent";
import "@/styles/not-found.page.css";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Global 404 for unmatched URLs outside the (site) layout.
 * Case-study and other site routes use (site)/not-found.tsx instead.
 */
export default function NotFound() {
  return (
    <div className="not-found-shell">
      <SiteNav />
      <main className="not-found-main">
        <NotFoundContent />
      </main>
      <SiteFooter />
    </div>
  );
}
