import type { Metadata } from "next";
import Link from "next/link";
import AdminBlogTable from "@/app/components/blog/AdminBlogTable";
import { AdminShell } from "@/app/components/blog/BlogChrome";
import { getAdminBlogPosts } from "@/lib/blog/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "블로그 관리",
};

export default async function AdminBlogPage() {
  const result = await getAdminBlogPosts();
  const posts = result.ok ? result.data : [];

  return (
    <AdminShell>
      <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[14px] font-bold leading-[21px] text-[#3d82f5]">ADMIN</p>
            <h1 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white md:text-[32px] md:leading-[44px]">
              블로그 관리
            </h1>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex h-[52px] w-fit items-center justify-center rounded-[32px] border border-white bg-gradient-to-r from-[#3d82f5] to-[#0360ef] px-6 text-[14px] font-bold leading-[21px] text-white"
          >
            블로그 작성하기
          </Link>
        </div>

        {!result.ok && (
          <div className="rounded-2xl border border-[#2f384a] bg-[#0f1219] px-5 py-4 text-[14px] font-medium leading-[21px] text-[#cbd4e5]">
            Supabase 연결 전입니다. `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
            `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET` 값을 설정하면 관리자 목록과 저장 기능이 동작합니다.
          </div>
        )}

        <AdminBlogTable posts={posts} />
      </div>
    </AdminShell>
  );
}
