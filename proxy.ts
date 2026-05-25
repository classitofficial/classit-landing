import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_ACCESS_COOKIE, getAdminCookieOptions, getSupabaseUserByToken } from "@/lib/admin-auth";

function isPublicAdminPath(pathname: string) {
  return pathname === "/admin/login";
}

function isPublicAdminApiPath(pathname: string) {
  return pathname === "/api/admin/auth/login" || pathname === "/api/admin/auth/logout";
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  loginUrl.searchParams.set("next", `${url.pathname}${url.search}`);

  const response = NextResponse.redirect(loginUrl);
  response.cookies.set(ADMIN_ACCESS_COOKIE, "", getAdminCookieOptions(0));
  return response;
}

function unauthorizedResponse() {
  const response = NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
  response.cookies.set(ADMIN_ACCESS_COOKIE, "", getAdminCookieOptions(0));
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAdminApiPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value || "";

  if (isPublicAdminPath(pathname)) {
    if (!token) return NextResponse.next();

    const result = await getSupabaseUserByToken(token);
    if (!result.ok) return NextResponse.next();

    const nextPath = request.nextUrl.searchParams.get("next");
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/admin/blog";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (!token) {
    return pathname.startsWith("/api/admin") ? unauthorizedResponse() : redirectToLogin(request);
  }

  const result = await getSupabaseUserByToken(token);
  if (!result.ok) {
    return pathname.startsWith("/api/admin") ? unauthorizedResponse() : redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
