import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "default_secret"
      );
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(new URL("/admin", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  // If already logged in and visiting /admin, redirect to dashboard
  if (pathname === "/admin") {
    const token = request.cookies.get("admin_token")?.value;
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || "default_secret"
        );
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch (error) {
        // Token is invalid, continue to login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
