import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingPanel } from "@/components/BookingPanel";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleAnalytics />
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
      <BookingPanel />
    </>
  );
}
