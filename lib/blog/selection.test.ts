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
    thumbnail_url: null,
    thumbnail_path: null,
    status: "published",
    is_featured: false,
    featured_sort_order: null,
    featured_image_url: null,
    featured_image_path: null,
    featured_title: null,
    featured_description: null,
    published_at: null,
    seo_title: null,
    seo_description: null,
    author_name: null,
    created_at: "2026-05-25T00:00:00.000Z",
    updated_at: "2026-05-25T00:00:00.000Z",
  };
}

describe("blog index post selection", () => {
  it("removes carousel posts from the regular list and recent top posts", () => {
    const posts = [post("featured-a"), post("latest-a"), post("featured-b"), post("latest-b"), post("latest-c"), post("latest-d")];
    const featuredPosts = [post("featured-a"), post("featured-b")];

    const result = getBlogIndexPosts(posts, featuredPosts);

    expect(result.regularPosts.map((item) => item.id)).toEqual(["latest-a", "latest-b", "latest-c", "latest-d"]);
    expect(result.topPosts.map((item) => item.id)).toEqual(["latest-a", "latest-b", "latest-c"]);
  });
});
