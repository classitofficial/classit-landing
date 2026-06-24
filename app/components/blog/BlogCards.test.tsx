import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BlogGridCard, BlogListItem } from "./BlogCards";
import type { BlogPost } from "@/lib/blog/types";

function post(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    id: "blog-post",
    title: "Blog Post",
    slug: "blog-post",
    summary: "Blog summary",
    content: "Blog content",
    content_format: "markdown",
    thumbnail_url: "https://example.com/thumb.png",
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
  };
}

describe("BlogCards", () => {
  it("adds the blog-list thumbnail border to grid cards", () => {
    const html = renderToStaticMarkup(<BlogGridCard post={post()} />);

    expect(html).toContain("border-[#1B1F2A]");
    expect(html).toContain('alt="Blog Post에 관한 대표 이미지"');
  });

  it("adds the blog-list thumbnail border only when requested for list items", () => {
    const defaultHtml = renderToStaticMarkup(<BlogListItem post={post()} />);
    const borderedHtml = renderToStaticMarkup(<BlogListItem post={post()} showThumbnailBorder />);

    expect(defaultHtml).not.toContain("border-[#1B1F2A]");
    expect(borderedHtml).toContain("border-[#1B1F2A]");
  });
});
