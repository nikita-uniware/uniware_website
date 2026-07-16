import { NextRequest, NextResponse } from "next/server";

/**
 * App Router cannot co-locate page.tsx + route.ts for the same segment.
 * Rewrite form POSTs to the API handlers so action="/contact" still works.
 */
export function middleware(req: NextRequest) {
  if (req.method !== "POST") return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/contact" || pathname === "/contact/") {
    const url = req.nextUrl.clone();
    url.pathname = "/api/contact";
    return NextResponse.rewrite(url);
  }
  if (pathname === "/contact/book-call" || pathname === "/contact/book-call/") {
    const url = req.nextUrl.clone();
    url.pathname = "/api/contact/book-call";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/contact", "/contact/", "/contact/book-call", "/contact/book-call/"],
};
