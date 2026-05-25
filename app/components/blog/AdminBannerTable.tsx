"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/app/components/blog/BlogCards";
import type { BlogBanner } from "@/lib/blog/types";

async function readError(response: Response) {
  try {
    const body = await response.json();
    return body?.message || "삭제에 실패했습니다.";
  } catch {
    return "삭제에 실패했습니다.";
  }
}

export default function AdminBannerTable({ banners }: { banners: BlogBanner[] }) {
  const [items, setItems] = useState(banners);
  const [selectedBanner, setSelectedBanner] = useState<BlogBanner | null>(null);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function deleteBanner(banner: BlogBanner) {
    if (!window.confirm("이 배너를 삭제할까요?")) return;

    setWorkingId(banner.id);
    setMessage("");

    const response = await fetch(`/api/admin/banners/${banner.id}`, {
      method: "DELETE",
    });

    setWorkingId(null);

    if (!response.ok) {
      setMessage(await readError(response));
      return;
    }

    setItems((current) => current.filter((item) => item.id !== banner.id));
    if (selectedBanner?.id === banner.id) setSelectedBanner(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {message && <div className="rounded-2xl border border-[#ff6b6b] px-4 py-3 text-[14px] font-bold text-[#ff8f8f]">{message}</div>}
      <div className="overflow-hidden rounded-2xl border border-[#1b1f2a]">
        <div className="hidden grid-cols-[96px_1fr_120px_150px_220px] bg-[#0f1219] px-5 py-4 text-[14px] font-bold leading-[21px] text-[#a9b1c1] md:grid">
          <span>순서</span>
          <span>배너</span>
          <span>링크</span>
          <span>등록일</span>
          <span>관리</span>
        </div>
        {items.length === 0 ? (
          <div className="px-5 py-16 text-center text-[14px] font-medium leading-[21px] text-[#a9b1c1]">
            등록된 배너가 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-[#1b1f2a]">
            {items.map((banner) => (
              <div
                key={banner.id}
                className="grid gap-3 px-5 py-4 text-[14px] font-medium leading-[21px] text-white md:grid-cols-[96px_1fr_120px_150px_220px] md:items-center"
              >
                <span className="text-[#a9b1c1]">{banner.sort_order}</span>
                <button
                  type="button"
                  onClick={() => setSelectedBanner(banner)}
                  className="flex min-w-0 items-center gap-3 text-left"
                >
                  <img src={banner.image_url} alt="" className="h-20 w-16 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0 truncate text-white">{banner.image_path || banner.image_url}</span>
                </button>
                <span className="truncate text-[#a9b1c1]">{banner.link_url || "-"}</span>
                <span className="text-[#a9b1c1]">{formatDate(banner.created_at)}</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBanner(banner)}
                    className="rounded-2xl border border-white px-3 py-2 text-[13px] font-bold leading-5 text-white"
                  >
                    상세
                  </button>
                  <Link
                    href={`/admin/banners/${banner.id}/edit`}
                    className="rounded-2xl border border-[#3d82f5] px-3 py-2 text-[13px] font-bold leading-5 text-[#3d82f5]"
                  >
                    수정
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteBanner(banner)}
                    disabled={workingId === banner.id}
                    className="rounded-2xl border border-[#ff6b6b] px-3 py-2 text-[13px] font-bold leading-5 text-[#ff8f8f] disabled:opacity-50"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5" role="dialog" aria-modal="true">
          <div className="flex max-h-[90svh] w-full max-w-[560px] flex-col gap-4 overflow-y-auto rounded-[28px] border border-[#2f384a] bg-[#0f1219] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold leading-[21px] text-[#3d82f5]">배너 상세</p>
                <p className="text-[13px] font-medium leading-5 text-[#a9b1c1]">노출 순서 {selectedBanner.sort_order}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBanner(null)}
                className="size-10 rounded-full border border-[#2f384a] text-[18px] font-bold text-white"
                aria-label="닫기"
              >
                ×
              </button>
            </div>
            <img src={selectedBanner.image_url} alt="" className="w-full rounded-2xl object-contain" />
            <div className="rounded-2xl bg-[#0b0e14] px-4 py-3 text-[13px] font-medium leading-5 text-[#cbd4e5]">
              {selectedBanner.link_url || "이동 링크 없음"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
