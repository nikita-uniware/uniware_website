import type { Metadata } from "next";
import { CloudSecurityPage } from "@/components/pages/CloudSecurityPage";

export const metadata: Metadata = {
  title: "Cloud Security Solutions | CSPM & Workload Protection | Uniware Systems",
  description:
    "Continuous cloud security posture monitoring across AWS, Azure, and Microsoft 365, plus workload protection for containers, Kubernetes, and serverless. Part of Uniware's complete security approach.",
  openGraph: {
    title: "Cloud Security Solutions | CSPM & Workload Protection | Uniware Systems",
    description:
      "Continuous cloud security posture monitoring across AWS, Azure, and Microsoft 365, plus workload protection for containers, Kubernetes, and serverless. Part of Uniware's complete security approach.",
  },
};

/**
 * Cloud Security page.
 * Route: /solutions/cloud/security/
 */
export default function Page() {
  return <CloudSecurityPage />;
}
