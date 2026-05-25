import { requireAdminRequest } from "@/lib/admin-auth";
import { uploadBlogBannerAsset } from "@/lib/blog/supabase";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if (!auth.ok) {
    return Response.json({ message: auth.message }, { status: auth.status });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ message: "업로드할 파일이 필요합니다." }, { status: 400 });
  }

  const result = await uploadBlogBannerAsset(file);
  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json(result.data);
}
