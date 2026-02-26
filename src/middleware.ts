// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// define role mapping for certain paths
const roleProtectedPaths: Record<string, string[]> = {
  "/": ["ADMIN", "EMPLOYEE"],
  "/admin": ["ADMIN"],
  "/admin/projects": ["ADMIN"],
  "/admin/employees": ["ADMIN"],
  "/admin/expenses": ["ADMIN"],
  "/admin/timecards": ["ADMIN"],

  "/employee": ["EMPLOYEE"],
  "/employee/projects": ["EMPLOYEE"],
  "/employee/employees": ["EMPLOYEE"],
  "/employee/expenses": ["EMPLOYEE"],
  "/employee/timecards": ["EMPLOYEE"],

  "/calendar": ["ADMIN", "EMPLOYEE"],
  "/profile": ["ADMIN", "EMPLOYEE"],
};

// public pages
const publicPages = [ "/login", "/register"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // allow public pages
  if (publicPages.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  // default: all other pages are protected
  const token = req.cookies.get("accessToken")?.value;
  console.log("token",token)
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // decode token only
    const decoded = jwtDecode<{ role: string }>(token);

    // check if role is allowed for this path
    const rolesAllowed = Object.keys(roleProtectedPaths).find((key) =>
      path.startsWith(key),
    )
      ? roleProtectedPaths[
          Object.keys(roleProtectedPaths).find((key) => path.startsWith(key))!
        ]
      : null;

    if (rolesAllowed && !rolesAllowed.includes(decoded.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // allowed
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
