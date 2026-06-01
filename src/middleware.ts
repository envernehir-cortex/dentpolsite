import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en", "de", "fr"];
const defaultLocale = "tr";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static dosyaları, imageleri ve api yollarını pas geç
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('dentpol-logo') ||
    pathname.includes('unsplash.com') // just in case
  ) {
    return;
  }

  // URL'de halihazırda dil kodu var mı kontrol et
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // URL'de dil kodu yoksa default dil kodu ile yönlendir
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Bütün rotaları yakala (istisnalar hariç)
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};
