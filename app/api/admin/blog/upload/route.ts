import { uploadBlogAsset } from "@/lib/blog/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ message: "업로드할 파일이 필요합니다." }, { status: 400 });
  }

  const result = await uploadBlogAsset(file);
  if (!result.ok) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  return Response.json(result.data);
}
