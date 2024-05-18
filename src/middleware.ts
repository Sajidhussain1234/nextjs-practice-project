import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPath = path === "/login" || path === "/signup";
  const authToken = request.cookies.get("authToken")?.value || "";

  // If request comes from public routes like---- /login /signup and have token then redirect it to /profile route
  if (publicPath && authToken) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  // If request comes from private routes like---- /profile etc and haven't token then redirect it to /login route
  if (!publicPath && !authToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/profile/:path*"],
};
