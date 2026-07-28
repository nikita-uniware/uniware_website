import type { Metadata } from "next";
import { spaceGrotesk, dmSans } from "./fonts";
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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
