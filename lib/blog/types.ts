export type BlogPostStatus = "draft" | "published";
export type BlogContentFormat = "markdown" | "html";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  content_format: BlogContentFormat | null;
  thumbnail_url: string | null;
  status: BlogPostStatus;
  is_featured: boolean | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  author_name: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogBanner = {
  id: string;
  title: string;
  image_url: string;
  image_path: string | null;
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type SupabaseConfig = {
  url: string;
  publishableKey: string;
};
