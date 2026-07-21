import type { Metadata } from "next";
import { CybersecurityPage } from "@/components/pages/CybersecurityPage";
import { fetchTechnologies } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Cybersecurity",
  description:
    "Good security blocks attacks. A good recovery plan makes them irrelevant. Prevention and recovery for manufacturing and mid-market businesses.",
};

/** Revalidate partner logos periodically so Studio publishes show up without a redeploy. */
export const revalidate = 60;

export default async function Page() {
  const technologies = await fetchTechnologies();
  return <CybersecurityPage technologies={technologies} />;
}
