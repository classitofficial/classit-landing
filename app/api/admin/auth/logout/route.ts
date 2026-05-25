import { NextResponse } from "next/server";
import { ADMIN_ACCESS_COOKIE, getAdminCookieOptions } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_ACCESS_COOKIE, "", getAdminCookieOptions(0));
  return response;
}
