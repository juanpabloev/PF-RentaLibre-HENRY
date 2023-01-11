import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("next-auth.session-token")?.value;
  if (request.nextUrl.pathname.startsWith("/account")) {
    if (jwt === undefined) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (jwt === undefined) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (jwt === undefined) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/favorites")) {
    if (jwt === undefined) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }
}