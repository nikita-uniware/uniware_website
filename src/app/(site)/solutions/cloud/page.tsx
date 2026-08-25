import type { Metadata } from "next";
import { CloudHubPage } from "@/components/pages/CloudHubPage";

export const metadata: Metadata = {
  title: "Cloud Services in Chennai & the US | Uniware Systems",
  description:
    "Uniware delivers cloud infrastructure, networking, security, and AWS expertise for mid-market and enterprise businesses across India and the US.",
  openGraph: {
    title: "Cloud Services in Chennai & the US | Uniware Systems",
    description:
      "Uniware delivers cloud infrastructure, networking, security, and AWS expertise for mid-market and enterprise businesses across India and the US.",
  },
};

/**
 * Cloud solutions hub.
 * Route: /solutions/cloud/
 */
export default function Page() {
  return <CloudHubPage />;
}
