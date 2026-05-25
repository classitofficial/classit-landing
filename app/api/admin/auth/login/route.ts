import { NextResponse } from "next/server";
import { ADMIN_ACCESS_COOKIE, getAdminCookieOptions, signInAdminWithPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = payload?.email?.trim();
  const password = payload?.password;

  if (!email || !password) {
    return NextResponse.json({ message: "이메일과 비밀번호를 입력해주세요." }, { status: 400 });
  }

  const result = await signInAdminWithPassword(email, password);
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  const response = NextResponse.json({
    ok: true,
    user: {
      email: result.data.user?.email || email,
      id: result.data.user?.id,
    },
  });

  response.cookies.set(
    ADMIN_ACCESS_COOKIE,
    result.data.access_token,
    getAdminCookieOptions(result.data.expires_in || 60 * 60),
  );

  return response;
}
