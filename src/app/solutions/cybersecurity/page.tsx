import type { Metadata } from "next";
import { CybersecurityPage } from "@/components/pages/CybersecurityPage";

export const metadata: Metadata = {
  title: "Cybersecurity",
  description:
    "Good security blocks attacks. A good recovery plan makes them irrelevant. Prevention and recovery for manufacturing and mid-market businesses.",
};

export default function Page() {
  return <CybersecurityPage />;
}
