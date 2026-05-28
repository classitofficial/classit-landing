import type { BlogPost } from "@/lib/blog/types";

export function getBlogIndexPosts(posts: BlogPost[]) {
  return {
    regularPosts: posts.slice(3),
    topPosts: posts.slice(0, 3),
  };
}
