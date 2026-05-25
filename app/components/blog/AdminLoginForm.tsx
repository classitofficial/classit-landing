"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

function safeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/admin/blog";
  if (value.startsWith("/admin/login")) return "/admin/blog";
  return value;
}

async function readLoginError(response: Response) {
  try {
    const body = await response.json();
    return body?.message || "로그인에 실패했습니다.";
  } catch {
    return "로그인에 실패했습니다.";
  }
}

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setMessage(await readLoginError(response));
      return;
    }

    router.push(safeNextPath(searchParams.get("next")));
    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-[420px] flex-col gap-6 rounded-[28px] border border-[#1b1f2a] bg-[#0f1219] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:px-8"
    >
      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-bold leading-[21px] text-[#3d82f5]">CLASSIT ADMIN</p>
        <h1 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white">관리자 로그인</h1>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">이메일</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="h-[52px] rounded-2xl border border-[#1b1f2a] bg-[#0b0e14] px-4 text-[16px] font-medium text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
            placeholder="admin@classit.kr"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">비밀번호</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="h-[52px] rounded-2xl border border-[#1b1f2a] bg-[#0b0e14] px-4 text-[16px] font-medium text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
            placeholder="비밀번호"
          />
        </label>
      </div>

      {message && (
        <div className="rounded-2xl border border-[#ff6b6b] px-4 py-3 text-[14px] font-bold leading-[21px] text-[#ff8f8f]">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-[52px] rounded-[32px] border border-white bg-gradient-to-r from-[#3d82f5] to-[#0360ef] px-6 text-[14px] font-bold leading-[21px] text-white disabled:opacity-50"
      >
        {isSubmitting ? "로그인 중" : "로그인"}
      </button>
    </form>
  );
}
