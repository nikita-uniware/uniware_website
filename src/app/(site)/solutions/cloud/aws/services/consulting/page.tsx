import type { Metadata } from "next";
import { AwsConsultingPage } from "@/components/pages/AwsConsultingPage";

export const metadata: Metadata = {
  title: "AWS Consulting Services in Chennai & the US | Uniware Systems",
  description:
    "Independent AWS consulting for businesses planning a move to AWS or looking to improve architecture, cost, and security on an existing environment. Based in India, serving clients across the US.",
  openGraph: {
    title: "AWS Consulting Services in Chennai & the US | Uniware Systems",
    description:
      "Independent AWS consulting for businesses planning a move to AWS or looking to improve architecture, cost, and security on an existing environment. Based in India, serving clients across the US.",
  },
};

/**
 * AWS Consulting page.
 * Route: /solutions/cloud/aws/services/consulting
 */
export default function Page() {
  return <AwsConsultingPage />;
}
