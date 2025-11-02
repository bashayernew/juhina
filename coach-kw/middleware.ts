import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Only redirect if user opens the root path
  if (req.nextUrl.pathname === "/") {
    const lang = req.headers.get("accept-language")?.toLowerCase() || "";
    const pref = lang.startsWith("ar") ? "ar" : "en";
    const url = req.nextUrl.clone();
    url.pathname = `/${pref}`;
    return NextResponse.redirect(url);
  }

  // Redirect removed routes to their home locale
  if (req.nextUrl.pathname === "/en/contact") {
    const url = req.nextUrl.clone();
    url.pathname = "/en/booking";
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname === "/ar/contact") {
    const url = req.nextUrl.clone();
    url.pathname = "/ar/booking";
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname === "/en/about") {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname === "/ar/about") {
    const url = req.nextUrl.clone();
    url.pathname = "/ar";
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname === "/en/testimonials") {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname === "/ar/testimonials") {
    const url = req.nextUrl.clone();
    url.pathname = "/ar";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Run only for the root and removed routes
export const config = { matcher: ["/", "/en/testimonials", "/ar/testimonials", "/en/about", "/ar/about", "/en/contact", "/ar/contact"] };


