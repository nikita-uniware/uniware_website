import type { Metadata } from "next";
import { CloudNetworkingPage } from "@/components/pages/CloudNetworkingPage";

export const metadata: Metadata = {
  title: "Cloud Networking | VPN, Direct Connect & SD-WAN | Uniware Systems",
  description:
    "Connect your business to AWS securely with VPN, Direct Connect, and SD-WAN, designed and managed by certified engineers in India and the US.",
  openGraph: {
    title: "Cloud Networking | VPN, Direct Connect & SD-WAN | Uniware Systems",
    description:
      "Connect your business to AWS securely with VPN, Direct Connect, and SD-WAN, designed and managed by certified engineers in India and the US.",
  },
};

/**
 * Cloud Networking page.
 * Route: /solutions/cloud/networking
 */
export default function Page() {
  return <CloudNetworkingPage />;
}
