import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingPanel } from "@/components/BookingPanel";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
      <BookingPanel />
    </>
  );
}
