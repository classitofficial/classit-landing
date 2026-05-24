import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminBlogForm from "@/app/components/blog/AdminBlogForm";
import { AdminShell } from "@/app/components/blog/BlogChrome";
import { getAdminBlogPostById } from "@/lib/blog/supabase";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "블로그 수정",
};

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getAdminBlogPostById(id);

  if (result.ok && !result.data) notFound();

  return (
    <AdminShell>
      {!result.ok ? (
        <div className="mx-auto w-full max-w-[640px] rounded-2xl border border-[#2f384a] bg-[#0f1219] px-5 py-4 text-[14px] font-medium leading-[21px] text-[#cbd4e5]">
          Supabase 연결 전입니다. 글을 불러오려면 환경변수를 먼저 설정해주세요.
        </div>
      ) : (
        <AdminBlogForm mode="edit" initialPost={result.data} />
      )}
    </AdminShell>
  );
}
