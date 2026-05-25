import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminBannerForm from "@/app/components/blog/AdminBannerForm";
import { AdminShell } from "@/app/components/blog/BlogChrome";
import { getAdminBlogBannerById } from "@/lib/blog/supabase";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "배너 수정",
};

export default async function EditBannerPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getAdminBlogBannerById(id);

  if (result.ok && !result.data) notFound();

  return (
    <AdminShell>
      {!result.ok ? (
        <div className="mx-auto w-full max-w-[640px] rounded-2xl border border-[#2f384a] bg-[#0f1219] px-5 py-4 text-[14px] font-medium leading-[21px] text-[#cbd4e5]">
          배너를 불러오려면 Supabase `blog_promo_banners` 테이블을 먼저 확인해주세요.
        </div>
      ) : (
        <AdminBannerForm mode="edit" initialBanner={result.data} />
      )}
    </AdminShell>
  );
}
