import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";
import "@/styles/not-found.page.css";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * 404 inside the site route group — SiteNav / SiteFooter come from (site)/layout.
 * Do not nest another nav/footer here (that caused extra white space below).
 */
export default function SiteNotFound() {
  return <NotFoundContent />;
}
