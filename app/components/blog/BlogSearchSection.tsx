"use client";

import { useMemo, useState } from "react";
import { BlogListItem } from "@/app/components/blog/BlogCards";
import type { BlogPost } from "@/lib/blog/types";

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.9284 17.04L20.4016 20.4M11.4016 7.19998C13.3898 7.19998 15.0016 8.81175 15.0016 10.8M19.2816 11.44C19.2816 15.7699 15.7715 19.28 11.4416 19.28C7.11165 19.28 3.60156 15.7699 3.60156 11.44C3.60156 7.11006 7.11165 3.59998 11.4416 3.59998C15.7715 3.59998 19.2816 7.11006 19.2816 11.44Z"
        stroke="#E9ECF2"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function matchesPost(post: BlogPost, query: string) {
  const target = [post.title, post.summary, post.content, post.author_name || ""].join(" ").toLowerCase();
  return target.includes(query);
}

export default function BlogSearchSection({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visiblePosts = useMemo(() => {
    if (!normalizedQuery) return posts;
    return posts.filter((post) => matchesPost(post, normalizedQuery));
  }, [normalizedQuery, posts]);

  return (
    <div className="flex flex-col gap-6">
      <label className="flex h-[52px] items-center gap-2 rounded-2xl border border-[#1b1f2a] bg-[#0b0e14] px-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="블로그 검색어를 입력해주세요."
          className="min-w-0 flex-1 bg-transparent text-[14px] font-medium leading-[21px] tracking-[-0.21px] text-[#f8faff] outline-none placeholder:text-[#5e677a]"
        />
        <SearchIcon />
      </label>
      {visiblePosts.length > 0 ? (
        <div className="flex flex-col gap-8">
          {visiblePosts.map((post) => (
            <BlogListItem key={post.id} post={post} showThumbnailBorder />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#1b1f2a] bg-[#0f1219] px-5 py-8 text-center text-[14px] font-medium leading-[21px] text-[#a9b1c1]">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
