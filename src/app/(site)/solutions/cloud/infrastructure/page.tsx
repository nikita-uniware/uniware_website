import type { Metadata } from "next";
import { CloudInfrastructurePage } from "@/components/pages/CloudInfrastructurePage";

export const metadata: Metadata = {
  title: "Cloud Infrastructure",
  description:
    "Private, public, and hybrid cloud infrastructure on AWS and Azure from Uniware Systems.",
};

/**
 * Cloud Infrastructure page.
 * Route: /solutions/cloud/infrastructure
 */
export default function Page() {
  return <CloudInfrastructurePage />;
}
