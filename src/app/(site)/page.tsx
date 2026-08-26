import { HomePage } from "@/components/pages/HomePage";
import { fetchCustomers } from "@/lib/sanity";

export const revalidate = 60;

/**
 * Homepage.
 * Route: /
 * No page-specific metadata given in Homepage_Build.md — the root
 * layout's default title/description already cover it.
 */
export default async function Page() {
  const customers = await fetchCustomers("homepage");
  return <HomePage customers={customers} />;
}
