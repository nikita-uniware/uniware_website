import type { Metadata } from "next";
import { spaceGrotesk, dmSans } from "./fonts";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingPanel } from "@/components/BookingPanel";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Uniware Systems",
    template: "%s | Uniware Systems",
  },
  description:
    "Adaptive Technology Integrators. Cloud, cybersecurity, modern workplace, and infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <BookingPanel />
      </body>
    </html>
  );
}
