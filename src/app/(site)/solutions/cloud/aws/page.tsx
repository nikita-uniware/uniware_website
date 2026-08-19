import type { Metadata } from "next";
import { AwsHubPage } from "@/components/pages/AwsHubPage";

export const metadata: Metadata = {
  title: "AWS Cloud Partner | Migration, Managed Services & More | Uniware Systems",
  description:
    "Uniware is an AWS Advanced Tier Partner delivering migration, managed services, consulting, and workload-specific expertise across India and the US.",
  openGraph: {
    title: "AWS Cloud Partner | Migration, Managed Services & More | Uniware Systems",
    description:
      "Uniware is an AWS Advanced Tier Partner delivering migration, managed services, consulting, and workload-specific expertise across India and the US.",
  },
};

/**
 * AWS Hub page.
 * Route: /solutions/cloud/aws
 */
export default function Page() {
  return <AwsHubPage />;
}
