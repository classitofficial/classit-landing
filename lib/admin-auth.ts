import type { BlogApiResult } from "@/lib/blog/types";

export const ADMIN_ACCESS_COOKIE = "classit_admin_access_token";

type SupabaseAuthConfig = {
  url: string;
  publishableKey: string;
};

export type SupabaseAuthUser = {
  id: string;
  email?: string | null;
};

type SupabasePasswordSession = {
  access_token: string;
  expires_in?: number;
  user?: SupabaseAuthUser;
};

export function getAdminCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

function getSupabaseAuthConfig(): BlogApiResult<SupabaseAuthConfig> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return { ok: false, status: 503, message: "Supabase Auth 환경변수가 설정되지 않았습니다." };
  }

  return {
    ok: true,
    data: {
      url: url.replace(/\/$/, ""),
      publishableKey,
    },
  };
}

async function parseAuthError(response: Response) {
  try {
    const body = await response.json();
    return body?.error_description || body?.msg || body?.message || "인증 요청에 실패했습니다.";
  } catch {
    return "인증 요청에 실패했습니다.";
  }
}

export async function signInAdminWithPassword(
  email: string,
  password: string,
): Promise<BlogApiResult<SupabasePasswordSession>> {
  const config = getSupabaseAuthConfig();
  if (!config.ok) return config;

  const response = await fetch(`${config.data.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: config.data.publishableKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, status: 401, message: await parseAuthError(response) };
  }

  return { ok: true, data: await response.json() };
}

export async function getSupabaseUserByToken(token: string): Promise<BlogApiResult<SupabaseAuthUser>> {
  const config = getSupabaseAuthConfig();
  if (!config.ok) return config;

  if (!token) {
    return { ok: false, status: 401, message: "로그인이 필요합니다." };
  }

  const response = await fetch(`${config.data.url}/auth/v1/user`, {
    headers: {
      apikey: config.data.publishableKey,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, status: 401, message: "로그인이 만료되었습니다." };
  }

  return { ok: true, data: await response.json() };
}

export function getCookieFromHeader(header: string | null, name: string) {
  if (!header) return "";

  const cookie = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  if (!cookie) return "";

  return decodeURIComponent(cookie.slice(name.length + 1));
}

export async function requireAdminRequest(request: Request): Promise<BlogApiResult<SupabaseAuthUser>> {
  const token = getCookieFromHeader(request.headers.get("cookie"), ADMIN_ACCESS_COOKIE);
  return getSupabaseUserByToken(token);
}
