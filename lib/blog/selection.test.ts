import { describe, expect, it } from "vitest";
import type { BlogPost } from "./types";
import { getBlogIndexPosts } from "./selection";

function post(id: string): BlogPost {
  return {
    id,
    title: `Post ${id}`,
    slug: `post-${id}`,
    summary: "",
    content: "",
    content_format: "markdown",
    thumbnail_url: null,
    status: "published",
    is_featured: false,
    published_at: null,
    seo_title: null,
    seo_description: null,
    author_name: null,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z",
  };
}

describe("blog index post selection", () => {
  it("splits the public post list into top three and remaining posts by position", () => {
    const posts = [post("post-1"), post("post-2"), post("post-3"), post("post-4"), post("post-5")];

    const result = getBlogIndexPosts(posts);

    expect(result.topPosts.map((item) => item.id)).toEqual(["post-1", "post-2", "post-3"]);
    expect(result.regularPosts.map((item) => item.id)).toEqual(["post-4", "post-5"]);
  });
});
