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
  thumbnail_path: string | null;
  status: BlogPostStatus;
  is_featured: boolean | null;
  featured_sort_order: number | null;
  featured_image_url: string | null;
  featured_image_path: string | null;
  featured_title: string | null;
  featured_description: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  author_name: string | null;
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
  created_at: string;
  updated_at: string;
};

export type SupabaseConfig = {
  url: string;
  publishableKey: string;
};
