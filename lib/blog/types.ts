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

export type SupabaseConfig = {
  url: string;
  anonKey: string;
  serviceRoleKey: string;
  storageBucket: string;
};

export type BlogApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };
