import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  let jwtLoc3000 = request.cookies.get("next-auth.session-token")?.value;
  let jwtVercel = request.cookies.get("__Secure-next-auth.session-token")?.value;

  let jwt = '';
  
  if(jwtLoc3000) jwt = jwtLoc3000;
  if(jwtVercel) jwt = jwtVercel;




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