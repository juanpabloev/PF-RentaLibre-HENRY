import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//pasa por este codigo y continua
// https://nextjs.org/docs/advanced-features/middleware

export function middleware(request: NextRequest) {
  //console.log(request.nextUrl.pathname)
  

  const jwt = request.cookies.get("next-auth.session-token")?.value;
  //console.log(jwt); // => 'fast'

  /*   const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }] */

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

}

// ver si poner en arreglo mas rutas-

// Proteger varias rutas: (ver doc)

/* export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
} */

