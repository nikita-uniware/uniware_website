import type { Metadata } from "next";
import { AwsGenAiPage } from "@/components/pages/AwsGenAiPage";

export const metadata: Metadata = {
  title: "AWS Generative AI Services (Amazon Bedrock) | Uniware Systems",
  description:
    "Custom generative AI applications built on Amazon Bedrock, tailored to your business rather than off-the-shelf. Delivered by AWS-certified engineers across India and the US.",
  openGraph: {
    title: "AWS Generative AI Services (Amazon Bedrock) | Uniware Systems",
    description:
      "Custom generative AI applications built on Amazon Bedrock, tailored to your business rather than off-the-shelf. Delivered by AWS-certified engineers across India and the US.",
  },
};

/**
 * AWS Generative AI (Amazon Bedrock) page.
 * Route: /solutions/cloud/aws/workloads/genai/
 */
export default function Page() {
  return <AwsGenAiPage />;
}
