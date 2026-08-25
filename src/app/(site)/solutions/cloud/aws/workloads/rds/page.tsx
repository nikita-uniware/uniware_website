import type { Metadata } from "next";
import { AwsRdsPage } from "@/components/pages/AwsRdsPage";

export const metadata: Metadata = {
  title: "AWS RDS Implementation & Management Experts | Uniware Systems",
  description:
    "Expert AWS RDS implementation, configuration, and ongoing management. High availability, automated backups, and performance tuning, delivered by AWS-certified engineers across India and the US.",
  openGraph: {
    title: "AWS RDS Implementation & Management Experts | Uniware Systems",
    description:
      "Expert AWS RDS implementation, configuration, and ongoing management. High availability, automated backups, and performance tuning, delivered by AWS-certified engineers across India and the US.",
  },
};

/**
 * AWS RDS page.
 * Route: /solutions/cloud/aws/workloads/rds/
 */
export default function Page() {
  return <AwsRdsPage />;
}
