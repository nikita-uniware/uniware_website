import type { Metadata } from "next";
import { CloudInfrastructurePage } from "@/components/pages/CloudInfrastructurePage";
import { fetchCloudInfrastructureTechnologies } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Cloud Infrastructure",
  description:
    "Private, public, and hybrid cloud infrastructure on AWS and Azure from Uniware Systems.",
};

export const revalidate = 60;

/**
 * Cloud Infrastructure page.
 * Route: /solutions/cloud/infrastructure
 */
export default async function Page() {
  const technologies = await fetchCloudInfrastructureTechnologies();
  return <CloudInfrastructurePage technologies={technologies} />;
}
