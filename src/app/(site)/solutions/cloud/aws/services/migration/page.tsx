import type { Metadata } from "next";
import { AwsMigrationPage } from "@/components/pages/AwsMigrationPage";

export const metadata: Metadata = {
  title: "AWS Migration",
  description:
    "Minimal-downtime AWS migration, planned and executed by certified engineers, from Uniware Systems.",
};

/**
 * AWS Migration page.
 * Route: /solutions/cloud/aws/services/migration
 */
export default function Page() {
  return <AwsMigrationPage />;
}
