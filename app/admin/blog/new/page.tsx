import type { Metadata } from "next";
import AdminBlogForm from "@/app/components/blog/AdminBlogForm";
import { AdminShell } from "@/app/components/blog/BlogChrome";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "블로그 작성",
};

export default function NewBlogPostPage() {
  return (
    <AdminShell>
      <AdminBlogForm mode="create" />
    </AdminShell>
  );
}
