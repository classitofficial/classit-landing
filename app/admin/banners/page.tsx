import type { Metadata } from "next";
import Link from "next/link";
import AdminBannerTable from "@/app/components/blog/AdminBannerTable";
import { AdminShell } from "@/app/components/blog/BlogChrome";
import { getAdminBlogBanners } from "@/lib/blog/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "배너 관리",
};

export default async function AdminBannersPage() {
  const result = await getAdminBlogBanners();
  const banners = result.ok ? result.data : [];

  return (
    <AdminShell>
      <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[14px] font-bold leading-[21px] text-[#3d82f5]">ADMIN</p>
            <h1 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white md:text-[32px] md:leading-[44px]">
              배너 관리
            </h1>
          </div>
          <Link
            href="/admin/banners/new"
            className="flex h-[52px] w-fit items-center justify-center rounded-[32px] border border-white bg-gradient-to-r from-[#3d82f5] to-[#0360ef] px-6 text-[14px] font-bold leading-[21px] text-white"
          >
            배너 등록하기
          </Link>
        </div>

        {!result.ok && (
          <div className="rounded-2xl border border-[#2f384a] bg-[#0f1219] px-5 py-4 text-[14px] font-medium leading-[21px] text-[#cbd4e5]">
            배너 테이블 연결 전입니다. Supabase에 `blog_promo_banners` 테이블과 공개 조회 정책을 확인해주세요.
          </div>
        )}

        <AdminBannerTable banners={banners} />
      </div>
    </AdminShell>
  );
}
