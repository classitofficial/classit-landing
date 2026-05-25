import type { Metadata } from "next";
import AdminBannerForm from "@/app/components/blog/AdminBannerForm";
import { AdminShell } from "@/app/components/blog/BlogChrome";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "배너 등록",
};

export default function NewBannerPage() {
  return (
    <AdminShell>
      <AdminBannerForm mode="create" />
    </AdminShell>
  );
}
