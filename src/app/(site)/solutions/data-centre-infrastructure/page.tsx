import type { Metadata } from "next";
import { InfrastructurePage } from "@/components/pages/InfrastructurePage";
import { fetchInfrastructureTechnologies } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Data Centre Infrastructure",
  description:
    "Data centre infrastructure solutions from Uniware Systems.",
};

export const revalidate = 60;

/**
 * Data Centre Infrastructure page.
 * Route: /solutions/data-centre-infrastructure
 */
export default async function Page() {
  const technologies = await fetchInfrastructureTechnologies();
  return <InfrastructurePage technologies={technologies} />;
}
