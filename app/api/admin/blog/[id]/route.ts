import { requireAdminRequest } from "@/lib/admin-auth";
import { getAdminBlogPostById, updateBlogPost } from "@/lib/blog/supabase";
import type { BlogPostInput } from "@/lib/blog/types";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteProps) {
  const auth = await requireAdminRequest(request);
  if (!auth.ok) {
    return Response.json({ message: auth.message }, { status: auth.status });
  }

  const { id } = await params;
  const result = await getAdminBlogPostById(id);

  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  if (!result.data) {
    return Response.json({ message: "글을 찾을 수 없습니다." }, { status: 404 });
  }

  return Response.json({ post: result.data });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const auth = await requireAdminRequest(request);
  if (!auth.ok) {
    return Response.json({ message: auth.message }, { status: auth.status });
  }

  const { id } = await params;
  const payload = (await request.json()) as BlogPostInput;
  const result = await updateBlogPost(id, payload);

  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json({ post: result.data });
}
