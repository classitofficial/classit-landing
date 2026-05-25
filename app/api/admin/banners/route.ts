import { requireAdminRequest } from "@/lib/admin-auth";
import { createBlogBanner, getAdminBlogBanners } from "@/lib/blog/supabase";
import type { BlogBannerInput } from "@/lib/blog/types";

export async function GET(request: Request) {
  const auth = await requireAdminRequest(request);
  if (!auth.ok) {
    return Response.json({ message: auth.message }, { status: auth.status });
  }

  const result = await getAdminBlogBanners();
  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json({ banners: result.data });
}

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if (!auth.ok) {
    return Response.json({ message: auth.message }, { status: auth.status });
  }

  const payload = (await request.json()) as BlogBannerInput;
  const result = await createBlogBanner(payload);

  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json({ banner: result.data }, { status: 201 });
}
