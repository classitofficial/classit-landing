export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail_url: string | null;
  thumbnail_path: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  author_name: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostInput = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail_url?: string | null;
  thumbnail_path?: string | null;
  status: BlogPostStatus;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  author_name?: string | null;
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

export type BlogBannerInput = {
  title?: string | null;
  image_url: string;
  image_path?: string | null;
  link_url?: string | null;
  sort_order: number;
  is_active?: boolean;
};

export type SupabaseConfig = {
  url: string;
  publishableKey: string;
  secretKey: string;
  storageBucket: string;
};

export type BlogApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };
