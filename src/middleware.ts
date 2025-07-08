import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;

  const protectedPaths = ["/admin"];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && isAuthenticated !== "true") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
