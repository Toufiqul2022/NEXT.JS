import { NextResponse } from "next/server";

/**
 * Protect authenticated routes using HttpOnly cookies.
 * Redirect unauthenticated users to /login?next=<path>
 */
export function middleware(request) {
  const authCookie = request.cookies.get("auth");
  const isAuthed = authCookie?.value === "true";

  // Allow public routes
  if (isAuthed) {
    return NextResponse.next();
  }

  // Save the requested path
  const nextPath =
    request.nextUrl.pathname + request.nextUrl.search;

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", nextPath);

  return NextResponse.redirect(loginUrl);
}

/**
 * Routes that require authentication
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/items/new",
  ],
};
