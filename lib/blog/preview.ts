import type { BlogPost } from "@/lib/blog/types";

export function getBlogContentPreview(post: Pick<BlogPost, "content">) {
  return post.content
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~\-]/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
