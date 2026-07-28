import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Uniware team. Offices across India, the US, and the UK.",
};

type PageProps = {
  searchParams: Promise<{ sent?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  return <ContactPage initialSent={params.sent === "1"} />;
}
