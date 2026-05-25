import { requireAdminRequest } from "@/lib/admin-auth";
import { deleteBlogBanner, getAdminBlogBannerById, updateBlogBanner } from "@/lib/blog/supabase";
import type { BlogBannerInput } from "@/lib/blog/types";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteProps) {
  const auth = await requireAdminRequest(request);
  if (!auth.ok) {
    return Response.json({ message: auth.message }, { status: auth.status });
  }

  const { id } = await params;
  const result = await getAdminBlogBannerById(id);

  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  if (!result.data) {
    return Response.json({ message: "배너를 찾을 수 없습니다." }, { status: 404 });
  }

  return Response.json({ banner: result.data });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const auth = await requireAdminRequest(request);
  if (!auth.ok) {
    return Response.json({ message: auth.message }, { status: auth.status });
  }

  const { id } = await params;
  const payload = (await request.json()) as BlogBannerInput;
  const result = await updateBlogBanner(id, payload);

  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json({ banner: result.data });
}

export async function DELETE(request: Request, { params }: RouteProps) {
  const auth = await requireAdminRequest(request);
  if (!auth.ok) {
    return Response.json({ message: auth.message }, { status: auth.status });
  }

  const { id } = await params;
  const result = await deleteBlogBanner(id);

  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json({ ok: true });
}
