"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/app/components/blog/BlogCards";
import type { BlogPost, BlogPostInput, BlogPostStatus } from "@/lib/blog/types";

function nextStatus(status: BlogPostStatus): BlogPostStatus {
  return status === "published" ? "draft" : "published";
}

function toPayload(post: BlogPost, status: BlogPostStatus): BlogPostInput {
  return {
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    content: post.content,
    thumbnail_url: post.thumbnail_url,
    thumbnail_path: post.thumbnail_path,
    status,
    published_at: status === "published" ? post.published_at || new Date().toISOString() : null,
    seo_title: post.seo_title,
    seo_description: post.seo_description,
    author_name: post.author_name,
  };
}

export default function AdminBlogTable({ posts }: { posts: BlogPost[] }) {
  const [items, setItems] = useState(posts);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function toggleStatus(post: BlogPost) {
    const status = nextStatus(post.status);
    setWorkingId(post.id);
    setMessage("");

    const response = await fetch(`/api/admin/blog/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(post, status)),
    });

    setWorkingId(null);

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { message?: string } | null;
      setMessage(body?.message || "상태 변경에 실패했습니다.");
      return;
    }

    const body = (await response.json()) as { post: BlogPost };
    setItems((current) => current.map((item) => (item.id === body.post.id ? body.post : item)));
  }

  return (
    <div className="flex flex-col gap-4">
      {message && <div className="rounded-2xl border border-[#ff6b6b] px-4 py-3 text-[14px] font-bold text-[#ff8f8f]">{message}</div>}
      <div className="overflow-hidden rounded-2xl border border-[#1b1f2a]">
        <div className="hidden grid-cols-[120px_1fr_90px_150px_180px] bg-[#0f1219] px-5 py-4 text-[14px] font-bold leading-[21px] text-[#a9b1c1] md:grid">
          <span>상태</span>
          <span>블로그 제목</span>
          <span>조회수</span>
          <span>등록일</span>
          <span>상세</span>
        </div>
        {items.length === 0 ? (
          <div className="px-5 py-16 text-center text-[14px] font-medium leading-[21px] text-[#a9b1c1]">
            등록된 블로그 글이 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-[#1b1f2a]">
            {items.map((post) => (
              <div
                key={post.id}
                className="grid gap-3 px-5 py-4 text-[14px] font-medium leading-[21px] text-white md:grid-cols-[120px_1fr_90px_150px_180px] md:items-center"
              >
                <span
                  className={`w-fit rounded-full px-3 py-1 text-[12px] font-bold leading-[18px] ${
                    post.status === "published" ? "bg-[#052e1a] text-[#5ee69b]" : "bg-[#28211a] text-[#ffc266]"
                  }`}
                >
                  {post.status === "published" ? "발행" : "임시저장"}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-bold">{post.title}</p>
                  <p className="truncate text-[12px] leading-[18px] text-[#a9b1c1]">/{post.slug}</p>
                </div>
                <span className="text-[#a9b1c1]">0</span>
                <span className="text-[#a9b1c1]">{formatDate(post.published_at || post.created_at)}</span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="rounded-2xl border border-[#3d82f5] px-3 py-2 text-[13px] font-bold leading-5 text-[#3d82f5]"
                  >
                    수정
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleStatus(post)}
                    disabled={workingId === post.id}
                    className="rounded-2xl border border-white px-3 py-2 text-[13px] font-bold leading-5 text-white disabled:opacity-50"
                  >
                    {post.status === "published" ? "비공개" : "발행"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
