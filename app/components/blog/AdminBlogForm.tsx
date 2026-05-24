"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { BlogPost, BlogPostInput, BlogPostStatus } from "@/lib/blog/types";

type AdminBlogFormProps = {
  initialPost?: BlogPost | null;
  mode: "create" | "edit";
};

type SaveState = "idle" | "saving" | "error" | "success";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function readError(response: Response) {
  try {
    const body = await response.json();
    return body?.message || "저장에 실패했습니다.";
  } catch {
    return "저장에 실패했습니다.";
  }
}

export default function AdminBlogForm({ initialPost, mode }: AdminBlogFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [summary, setSummary] = useState(initialPost?.summary || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const thumbnailUrl = initialPost?.thumbnail_url || "";
  const thumbnailPath = initialPost?.thumbnail_path || "";
  const [seoTitle, setSeoTitle] = useState(initialPost?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(initialPost?.seo_description || "");
  const [authorName, setAuthorName] = useState(initialPost?.author_name || "Classit");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const previewUrl = useMemo(() => {
    if (thumbnailFile) return URL.createObjectURL(thumbnailFile);
    return thumbnailUrl;
  }, [thumbnailFile, thumbnailUrl]);

  async function uploadThumbnail() {
    if (!thumbnailFile) return { url: thumbnailUrl || null, path: thumbnailPath || null };

    const formData = new FormData();
    formData.append("file", thumbnailFile);

    const response = await fetch("/api/admin/blog/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(await readError(response));

    const result = (await response.json()) as { url: string; path: string };
    return { url: result.url, path: result.path };
  }

  async function save(status: BlogPostStatus) {
    setSaveState("saving");
    setMessage("");

    try {
      const thumbnail = await uploadThumbnail();
      const payload: BlogPostInput = {
        title,
        slug: slug || slugify(title),
        summary,
        content,
        thumbnail_url: thumbnail.url,
        thumbnail_path: thumbnail.path,
        status,
        published_at: status === "published" ? initialPost?.published_at || new Date().toISOString() : null,
        seo_title: seoTitle,
        seo_description: seoDescription,
        author_name: authorName,
      };

      const response = await fetch(mode === "edit" && initialPost ? `/api/admin/blog/${initialPost.id}` : "/api/admin/blog", {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await readError(response));

      setSaveState("success");
      setMessage(status === "draft" ? "임시저장했습니다." : "발행했습니다.");
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "저장에 실패했습니다.");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-bold leading-[21px] text-[#3d82f5]">BLOG CMS</p>
        <h1 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white md:text-[32px] md:leading-[44px]">
          {mode === "edit" ? "블로그 수정" : "블로그 작성"}
        </h1>
      </div>

      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">제목</span>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (!initialPost && !slug) setSlug(slugify(event.target.value));
            }}
            placeholder="블로그 제목을 입력해주세요."
            className="h-[52px] rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 text-[16px] font-medium text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">slug</span>
          <input
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            placeholder="url-friendly-slug"
            className="h-[52px] rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 text-[16px] font-medium text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">요약</span>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="목록과 SEO에 사용할 요약을 입력해주세요."
            rows={3}
            className="resize-none rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 py-4 text-[16px] font-medium leading-7 text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">본문</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="본문을 입력해주세요."
            rows={14}
            className="resize-y rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 py-4 text-[16px] font-medium leading-7 text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-bold leading-[21px] text-white">SEO 제목</span>
            <input
              value={seoTitle}
              onChange={(event) => setSeoTitle(event.target.value)}
              placeholder="검색 결과 제목"
              className="h-[52px] rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 text-[16px] font-medium text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-bold leading-[21px] text-white">작성자</span>
            <input
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              placeholder="Classit"
              className="h-[52px] rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 text-[16px] font-medium text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-bold leading-[21px] text-white">SEO 설명</span>
          <textarea
            value={seoDescription}
            onChange={(event) => setSeoDescription(event.target.value)}
            placeholder="검색 결과에 노출할 설명"
            rows={3}
            className="resize-none rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-4 py-4 text-[16px] font-medium leading-7 text-white outline-none placeholder:text-[#5c6475] focus:border-[#3d82f5]"
          />
        </label>

        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#2f384a] bg-[#0f1219] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-bold leading-[21px] text-white">썸네일 이미지</p>
              <p className="text-[13px] font-medium leading-5 text-[#a9b1c1]">Supabase Storage에 업로드하고 URL을 저장합니다.</p>
            </div>
            <label className="shrink-0 cursor-pointer rounded-2xl border border-white px-4 py-3 text-[14px] font-bold leading-[21px] text-white">
              파일 선택
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => setThumbnailFile(event.target.files?.[0] || null)}
              />
            </label>
          </div>
          {previewUrl && <img src={previewUrl} alt="" className="max-h-[260px] w-full rounded-2xl object-cover" />}
        </div>
      </div>

      {message && (
        <div
          className={`rounded-2xl border px-4 py-3 text-[14px] font-bold leading-[21px] ${
            saveState === "error" ? "border-[#ff6b6b] text-[#ff8f8f]" : "border-[#3d82f5] text-[#8bb7ff]"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end">
        <Link
          href="/admin/blog"
          className="flex h-[52px] items-center justify-center rounded-[32px] border border-[#3d82f5] px-6 text-[14px] font-bold leading-[21px] text-[#3d82f5]"
        >
          목록으로
        </Link>
        <button
          type="button"
          onClick={() => save("draft")}
          disabled={saveState === "saving"}
          className="h-[52px] rounded-[32px] border border-white px-6 text-[14px] font-bold leading-[21px] text-white disabled:opacity-50"
        >
          임시저장
        </button>
        <button
          type="button"
          onClick={() => save("published")}
          disabled={saveState === "saving"}
          className="h-[52px] rounded-[32px] border border-white bg-gradient-to-r from-[#3d82f5] to-[#0360ef] px-6 text-[14px] font-bold leading-[21px] text-white disabled:opacity-50"
        >
          {mode === "edit" ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
