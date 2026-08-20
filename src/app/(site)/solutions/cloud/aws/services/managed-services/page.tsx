import type { Metadata } from "next";
import { AwsManagedServicesPage } from "@/components/pages/AwsManagedServicesPage";

export const metadata: Metadata = {
  title: "AWS Managed Services",
  description:
    "24/7 monitoring, security, cost control, and support for AWS environments already in production, from Uniware Systems.",
};

/**
 * AWS Managed Services page.
 * Route: /solutions/cloud/aws/services/managed-services
 */
export default function Page() {
  return <AwsManagedServicesPage />;
}
