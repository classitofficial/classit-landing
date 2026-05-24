import { createBlogPost, getAdminBlogPosts } from "@/lib/blog/supabase";
import type { BlogPostInput } from "@/lib/blog/types";

export async function GET() {
  const result = await getAdminBlogPosts();
  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json({ posts: result.data });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as BlogPostInput;
  const result = await createBlogPost(payload);

  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json({ post: result.data }, { status: 201 });
}
