import { NextResponse, type NextRequest } from "next/server";

const LOCALE_COOKIE = "locale";
const LOCALES = ["en", "ar"] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Ignore next internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  const isLocalized = /^\/(en|ar)(?:\/|$)/.test(pathname);
  if (isLocalized) return NextResponse.next();

  // Decide locale from cookie; default en
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  const locale = LOCALES.includes(cookieLocale as any) ? (cookieLocale as any) : "ar";

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};


