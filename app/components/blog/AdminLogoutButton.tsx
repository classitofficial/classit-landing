"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function logout() {
    setIsSubmitting(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={isSubmitting}
      className="flex h-[52px] items-center justify-center rounded-[32px] border border-[#2f384a] px-4 text-[14px] font-bold leading-[21px] text-[#cbd4e5] disabled:opacity-50"
    >
      {isSubmitting ? "로그아웃 중" : "로그아웃"}
    </button>
  );
}
