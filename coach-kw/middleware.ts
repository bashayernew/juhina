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
  return NextResponse.next();
}

// Run only for the root path
export const config = { matcher: ["/"] };


