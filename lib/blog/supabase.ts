import type { BlogBanner, BlogPost, SupabaseConfig } from "@/lib/blog/types";

const TABLE = "blog_posts";
const BANNER_TABLE = "blog_promo_banners";
type PublicBlogPostsOptions = {
  limit?: number;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) return null;

  return {
    url: url.replace(/\/$/, ""),
    publishableKey,
  };
}

function publicHeaders(config: SupabaseConfig) {
  return {
    apikey: config.publishableKey,
  };
}

export async function getPublicBlogPosts(options: PublicBlogPostsOptions = {}): Promise<BlogPost[]> {
  const config = getSupabaseConfig();
  if (!config) return [];

  const params = new URLSearchParams({
    select: "*",
    status: "eq.published",
    order: "published_at.desc.nullslast,created_at.desc",
  });

  if (options.limit !== undefined) {
    params.set("limit", String(options.limit));
  }

  const response = await fetch(`${config.url}/rest/v1/${TABLE}?${params}`, {
    headers: publicHeaders(config),
    next: { revalidate: 60 },
  });

  if (!response.ok) return [];
  return response.json();
}

export async function getPublicFeaturedBlogPosts(): Promise<BlogPost[]> {
  const config = getSupabaseConfig();
  if (!config) return [];

  const params = new URLSearchParams({
    select: "*",
    status: "eq.published",
    is_featured: "eq.true",
    order: "featured_sort_order.asc.nullslast,published_at.desc.nullslast,created_at.desc",
  });

  const response = await fetch(`${config.url}/rest/v1/${TABLE}?${params}`, {
    headers: publicHeaders(config),
    next: { revalidate: 60 },
  });

  if (!response.ok) return [];
  return response.json();
}

export async function getPublicBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const config = getSupabaseConfig();
  if (!config) return null;

  const params = new URLSearchParams({
    select: "*",
    slug: `eq.${slug}`,
    status: "eq.published",
    limit: "1",
  });

  const response = await fetch(`${config.url}/rest/v1/${TABLE}?${params}`, {
    headers: publicHeaders(config),
    next: { revalidate: 60 },
  });

  if (!response.ok) return null;
  const posts = (await response.json()) as BlogPost[];
  return posts[0] || null;
}

export async function getPublicBlogBanners(): Promise<BlogBanner[]> {
  const config = getSupabaseConfig();
  if (!config) return [];

  const params = new URLSearchParams({
    select: "*",
    is_active: "eq.true",
    order: "sort_order.asc,created_at.asc",
  });

  const response = await fetch(`${config.url}/rest/v1/${BANNER_TABLE}?${params}`, {
    headers: publicHeaders(config),
    next: { revalidate: 60 },
  });

  if (!response.ok) return [];
  return response.json();
}
