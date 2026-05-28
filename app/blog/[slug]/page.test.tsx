import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import BlogDetailPage from "./page";
import type { BlogPost } from "@/lib/blog/types";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("not found");
  },
  usePathname: () => "/blog/current",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const post = (overrides: Partial<BlogPost> = {}): BlogPost => ({
  id: "post-1",
  title: "온라인 강의 사이트 만들기 전에 꼭 알아야 할 것들, 외주 개발 vs LMS 솔루션 완전 비교",
  slug: "current",
  summary: "Summary",
  content: "본문",
  content_format: "markdown",
  thumbnail_url: null,
  status: "published",
  is_featured: false,
  published_at: "2026-05-28T00:00:00.000Z",
  seo_title: null,
  seo_description: null,
  author_name: "Classit",
  deleted_at: null,
  created_at: "2026-05-28T00:00:00.000Z",
  updated_at: "2026-05-28T00:00:00.000Z",
  ...overrides,
});

vi.mock("@/lib/blog/supabase", () => ({
  getPublicBlogPostBySlug: vi.fn(async () => post()),
  getPublicBlogPosts: vi.fn(async () => [
    post(),
    post({ id: "post-2", slug: "more-1", title: "더 많은 글 1" }),
  ]),
}));

describe("BlogDetailPage", () => {
  it("matches the current design feedback for detail heading and more posts area", async () => {
    const element = await BlogDetailPage({ params: Promise.resolve({ slug: "current" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("text-[28px] font-bold leading-9 tracking-[-0.7px] text-white");
    expect(html).not.toContain("md:text-[32px] md:leading-[44px]");
    expect(html).toContain("linear-gradient(90deg, rgba(94,103,122,0) 0%, rgba(94,103,122,0.4) 49.52%, rgba(94,103,122,0) 100%)");
    expect(html).toContain("text-[20px] font-bold leading-7 tracking-[-0.5px] text-white");
  });
});
