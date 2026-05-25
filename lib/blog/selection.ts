import type { BlogPost } from "@/lib/blog/types";

export function getBlogIndexPosts(posts: BlogPost[], featuredPosts: BlogPost[]) {
  const featuredIds = new Set(featuredPosts.map((post) => post.id));
  const regularPosts = posts.filter((post) => !featuredIds.has(post.id));

  return {
    regularPosts,
    topPosts: regularPosts.slice(0, 3),
  };
}
