import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import BlogFeaturedCarousel, { getCarouselClickTargetPost, shouldSuppressCarouselClick } from "./BlogFeaturedCarousel";
import type { BlogPost } from "@/lib/blog/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

function post(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    id: "featured-post",
    title: "Featured Post",
    slug: "featured-post",
    summary: "Featured summary",
    content: "Featured content",
    content_format: "markdown",
    thumbnail_url: null,
    status: "published",
    is_featured: true,
    published_at: "2026-05-28T00:00:00.000Z",
    seo_title: null,
    seo_description: null,
    author_name: "Classit",
    deleted_at: null,
    created_at: "2026-05-28T00:00:00.000Z",
    updated_at: "2026-05-28T00:00:00.000Z",
    ...overrides,
  };
}

describe("BlogFeaturedCarousel", () => {
  it("renders each carousel card as a direct article detail link", () => {
    const html = renderToStaticMarkup(<BlogFeaturedCarousel posts={[post({ thumbnail_url: "https://example.com/featured.png" }), post({ id: "post-2", slug: "post-2" })]} />);

    expect(html).toContain('href="/blog/featured-post"');
    expect(html).toContain('alt="Featured Post에 관한 대표 이미지"');
    expect(html).toContain("Featured Post");
    expect(html).toContain("relative h-[350px] overflow-hidden md:h-[480px]");
    expect(html).toContain("rgba(11,14,20,0.58)_55%");
    expect(html).toContain("line-clamp-2 text-[14px]");
    expect(html).toContain("추천 아티클 슬라이드");
    expect(html).toContain("1번째 추천 아티클 보기");
    expect(html).not.toContain("line-clamp-3 text-[14px]");
  });

  it("suppresses navigation only after a swipe-distance pointer move", () => {
    expect(shouldSuppressCarouselClick(0)).toBe(false);
    expect(shouldSuppressCarouselClick(16)).toBe(false);
    expect(shouldSuppressCarouselClick(17)).toBe(true);
    expect(shouldSuppressCarouselClick(-17)).toBe(true);
  });

  it("returns the active carousel post only for a click-distance pointer gesture", () => {
    const posts = [post({ id: "a", slug: "a" }), post({ id: "b", slug: "b" })];

    expect(getCarouselClickTargetPost(posts, 1, 0)?.slug).toBe("b");
    expect(getCarouselClickTargetPost(posts, 1, 16)?.slug).toBe("b");
    expect(getCarouselClickTargetPost(posts, 1, 17)).toBeNull();
  });
});
