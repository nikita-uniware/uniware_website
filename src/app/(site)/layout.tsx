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
      <div className="site-shell">
        <SiteNav />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </div>
      <BookingPanel />
    </>
  );
}
