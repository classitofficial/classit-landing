"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { BlogBanner, BlogBannerInput } from "@/lib/blog/types";

type AdminBannerFormProps = {
  initialBanner?: BlogBanner | null;
  mode: "create" | "edit";
};

type SaveState = "idle" | "saving" | "error";

async function readError(response: Response) {
  try {
    const body = await response.json();
    return body?.message || "저장에 실패했습니다.";
  } catch {
    return "저장에 실패했습니다.";
  }
}

export default function AdminBannerForm({ initialBanner, mode }: AdminBannerFormProps) {
  const router = useRouter();
  const [linkUrl, setLinkUrl] = useState(initialBanner?.link_url || "");
  const [sortOrder, setSortOrder] = useState(String(initialBanner?.sort_order ?? 0));
  const imageUrl = initialBanner?.image_url || "";
  const imagePath = initialBanner?.image_path || "";
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const previewUrl = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return imageUrl;
  }, [imageFile, imageUrl]);

  async function uploadImage() {
    if (!imageFile) return { url: imageUrl || null, path: imagePath || null };

    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch("/api/admin/banners/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(await readError(response));

    const result = (await response.json()) as { url: string; path: string };
    return { url: result.url, path: result.path };
  }

  async function save() {
    setSaveState("saving");
    setMessage("");

    try {
      const image = await uploadImage();
      const payload: BlogBannerInput = {
        title: "",
        image_url: image.url || "",
        image_path: image.path,
        link_url: linkUrl,
        sort_order: Number.parseInt(sortOrder, 10) || 0,
        is_active: true,
      };

      const response = await fetch(
        mode === "edit" && initialBanner ? `/api/admin/banners/${initialBanner.id}` : "/api/admin/banners",
        {
          method: mode === "edit" ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error(await readError(response));

      router.push("/admin/banners");
      router.refresh();
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "저장에 실패했습니다.");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-bold leading-[21px] text-[#3d82f5]">BANNER CMS</p>
        <h1 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white md:text-[32px] md:leading-[44px]">
          {mode === "edit" ? "배너 수정" : "배너 등록"}
        </h1>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#2f384a] bg-[#0f1219] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-bold leading-[21px] text-white">배너 통이미지</p>
              <p className="text-[13px] font-medium leading-5 text-[#a9b1c1]">블로그 사이드바에 그대로 노출할 이미지를 업로드합니다.</p>
            </div>
            <label className="shrink-0 cursor-pointer rounded-2xl border border-white px-4 py-3 text-[14px] font-bold leading-[21px] text-white">
              파일 선택
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => setImageFile(event.target.files?.[0] || null)}
              />
            </label>
          </div>
          {previewUrl ? (
            <img src={previewUrl} alt="" className="max-h-[420px] w-full rounded-2xl object-contain" />
          ) : (
            <div className="flex h-[260px] items-center justify-center rounded-2xl bg-[#0b0e14] text-[14px] font-medium text-[#a9b1c1]">
              등록된 이미지가 없습니다.
            </div>
          )}
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">이동 링크</span>
          <input
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            placeholder="https://..."
            className="h-[52px] rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 text-[16px] font-medium text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">노출 순서</span>
          <input
            type="number"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="h-[52px] rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 text-[16px] font-medium text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
          />
        </label>
      </div>

      {message && (
        <div className="rounded-2xl border border-[#ff6b6b] px-4 py-3 text-[14px] font-bold leading-[21px] text-[#ff8f8f]">
          {message}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end">
        <Link
          href="/admin/banners"
          className="flex h-[52px] items-center justify-center rounded-[32px] border border-[#3d82f5] px-6 text-[14px] font-bold leading-[21px] text-[#3d82f5]"
        >
          목록으로
        </Link>
        <button
          type="button"
          onClick={save}
          disabled={saveState === "saving"}
          className="h-[52px] rounded-[32px] border border-white bg-gradient-to-r from-[#3d82f5] to-[#0360ef] px-6 text-[14px] font-bold leading-[21px] text-white disabled:opacity-50"
        >
          {saveState === "saving" ? "저장 중" : mode === "edit" ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
