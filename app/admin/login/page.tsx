import type { Metadata } from "next";
import { Suspense } from "react";
import AdminLoginForm from "@/app/components/blog/AdminLoginForm";

export const metadata: Metadata = {
  title: "관리자 로그인",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0e14] px-5 py-12 text-[#f8faff]">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
