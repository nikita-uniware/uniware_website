import type { Metadata } from "next";
import { CloudOperationsPage } from "@/components/pages/CloudOperationsPage";

export const metadata: Metadata = {
  title: "Cloud Operations & Multi-Cloud Management | Uniware Systems",
  description:
    "Deployment, automation, governance, and disaster recovery for cloud environments across AWS, Azure, on-premises, or a mix of all three.",
  openGraph: {
    title: "Cloud Operations & Multi-Cloud Management | Uniware Systems",
    description:
      "Deployment, automation, governance, and disaster recovery for cloud environments across AWS, Azure, on-premises, or a mix of all three.",
  },
};

/**
 * Cloud Operations page.
 * Route: /solutions/cloud/operations/
 */
export default function Page() {
  return <CloudOperationsPage />;
}
