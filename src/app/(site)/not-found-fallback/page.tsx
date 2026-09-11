import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";
import "@/styles/not-found.page.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Branded 404 target for the WordPress fallback proxy.
 * When WP returns 404 for an unknown URL, the proxy rewrites here so the
 * visitor keeps the original path in the address bar but sees our page.
 * Direct visits to this path also show the same UI.
 */
export default function NotFoundFallbackPage() {
  return <NotFoundContent />;
}
