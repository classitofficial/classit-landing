import { sampleBlogPosts } from "@/lib/blog/sample";
import type { BlogApiResult, BlogBanner, BlogBannerInput, BlogPost, BlogPostInput, SupabaseConfig } from "@/lib/blog/types";

const TABLE = "blog_posts";
const BANNER_TABLE = "blog_promo_banners";

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  const storageBucket = process.env.SUPABASE_STORAGE_BUCKET || "blog-assets";

  if (!url || !publishableKey || !secretKey) return null;

  return {
    url: url.replace(/\/$/, ""),
    publishableKey,
    secretKey,
    storageBucket,
  };
}

export function isSupabaseConfigured() {
  return getSupabaseConfig() !== null;
}

function publicHeaders(config: SupabaseConfig) {
  return {
    apikey: config.publishableKey,
  };
}

function adminHeaders(config: SupabaseConfig) {
  return {
    apikey: config.secretKey,
  };
}

function jsonHeaders(config: SupabaseConfig) {
  return {
    ...adminHeaders(config),
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

async function parseSupabaseError(response: Response) {
  try {
    const body = await response.json();
    return body?.message || body?.hint || body?.details || "Supabase request failed.";
  } catch {
    return "Supabase request failed.";
  }
}

function normalizePost(input: BlogPostInput) {
  const now = new Date().toISOString();
  return {
    title: input.title.trim(),
    slug: input.slug.trim(),
    summary: input.summary.trim(),
    content: input.content,
    thumbnail_url: input.thumbnail_url || null,
    thumbnail_path: input.thumbnail_path || null,
    status: input.status,
    published_at: input.status === "published" ? input.published_at || now : null,
    seo_title: input.seo_title?.trim() || null,
    seo_description: input.seo_description?.trim() || null,
    author_name: input.author_name?.trim() || "Classit",
    updated_at: now,
  };
}

export function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getPublicBlogPosts(): Promise<BlogPost[]> {
  const config = getSupabaseConfig();
  if (!config) return sampleBlogPosts;

  const params = new URLSearchParams({
    select: "*",
    status: "eq.published",
    order: "published_at.desc.nullslast,created_at.desc",
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
  if (!config) return sampleBlogPosts.find((post) => post.slug === slug) || null;

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

export async function getAdminBlogPosts(): Promise<BlogApiResult<BlogPost[]>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const params = new URLSearchParams({
    select: "*",
    order: "updated_at.desc,created_at.desc",
  });

  const response = await fetch(`${config.url}/rest/v1/${TABLE}?${params}`, {
    headers: adminHeaders(config),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  return { ok: true, data: await response.json() };
}

export async function getAdminBlogPostById(id: string): Promise<BlogApiResult<BlogPost | null>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const params = new URLSearchParams({
    select: "*",
    id: `eq.${id}`,
    limit: "1",
  });

  const response = await fetch(`${config.url}/rest/v1/${TABLE}?${params}`, {
    headers: adminHeaders(config),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  const posts = (await response.json()) as BlogPost[];
  return { ok: true, data: posts[0] || null };
}

async function isSlugTaken(config: SupabaseConfig, slug: string, exceptId?: string) {
  const params = new URLSearchParams({
    select: "id",
    slug: `eq.${slug}`,
    limit: "1",
  });

  if (exceptId) params.set("id", `neq.${exceptId}`);

  const response = await fetch(`${config.url}/rest/v1/${TABLE}?${params}`, {
    headers: adminHeaders(config),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(await parseSupabaseError(response));
  const posts = (await response.json()) as Pick<BlogPost, "id">[];
  return posts.length > 0;
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogApiResult<BlogPost>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const payload = normalizePost(input);
  if (!payload.title || !payload.slug) {
    return { ok: false, status: 400, message: "제목과 slug는 필수입니다." };
  }

  if (await isSlugTaken(config, payload.slug)) {
    return { ok: false, status: 409, message: "이미 사용 중인 slug입니다." };
  }

  const response = await fetch(`${config.url}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: jsonHeaders(config),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  const posts = (await response.json()) as BlogPost[];
  return { ok: true, data: posts[0] };
}

export async function updateBlogPost(id: string, input: BlogPostInput): Promise<BlogApiResult<BlogPost>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const payload = normalizePost(input);
  if (!payload.title || !payload.slug) {
    return { ok: false, status: 400, message: "제목과 slug는 필수입니다." };
  }

  if (await isSlugTaken(config, payload.slug, id)) {
    return { ok: false, status: 409, message: "이미 사용 중인 slug입니다." };
  }

  const response = await fetch(`${config.url}/rest/v1/${TABLE}?id=eq.${id}`, {
    method: "PATCH",
    headers: jsonHeaders(config),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  const posts = (await response.json()) as BlogPost[];
  return { ok: true, data: posts[0] };
}

export async function uploadBlogAsset(file: File): Promise<BlogApiResult<{ path: string; url: string }>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const extension = file.name.split(".").pop() || "bin";
  const path = `blog/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const response = await fetch(`${config.url}/storage/v1/object/${config.storageBucket}/${path}`, {
    method: "POST",
    headers: {
      ...adminHeaders(config),
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: file,
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  return {
    ok: true,
    data: {
      path,
      url: `${config.url}/storage/v1/object/public/${config.storageBucket}/${path}`,
    },
  };
}

function normalizeBanner(input: BlogBannerInput) {
  const now = new Date().toISOString();
  return {
    title: input.title?.trim() || "",
    image_url: input.image_url.trim(),
    image_path: input.image_path || null,
    link_url: input.link_url?.trim() || null,
    sort_order: Number.isFinite(input.sort_order) ? input.sort_order : 0,
    is_active: input.is_active ?? true,
    updated_at: now,
  };
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

export async function getAdminBlogBanners(): Promise<BlogApiResult<BlogBanner[]>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const params = new URLSearchParams({
    select: "*",
    order: "sort_order.asc,created_at.asc",
  });

  const response = await fetch(`${config.url}/rest/v1/${BANNER_TABLE}?${params}`, {
    headers: adminHeaders(config),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  return { ok: true, data: await response.json() };
}

export async function getAdminBlogBannerById(id: string): Promise<BlogApiResult<BlogBanner | null>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const params = new URLSearchParams({
    select: "*",
    id: `eq.${id}`,
    limit: "1",
  });

  const response = await fetch(`${config.url}/rest/v1/${BANNER_TABLE}?${params}`, {
    headers: adminHeaders(config),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  const banners = (await response.json()) as BlogBanner[];
  return { ok: true, data: banners[0] || null };
}

export async function createBlogBanner(input: BlogBannerInput): Promise<BlogApiResult<BlogBanner>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const payload = normalizeBanner(input);
  if (!payload.image_url) {
    return { ok: false, status: 400, message: "배너 이미지는 필수입니다." };
  }

  const response = await fetch(`${config.url}/rest/v1/${BANNER_TABLE}`, {
    method: "POST",
    headers: jsonHeaders(config),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  const banners = (await response.json()) as BlogBanner[];
  return { ok: true, data: banners[0] };
}

export async function updateBlogBanner(id: string, input: BlogBannerInput): Promise<BlogApiResult<BlogBanner>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const payload = normalizeBanner(input);
  if (!payload.image_url) {
    return { ok: false, status: 400, message: "배너 이미지는 필수입니다." };
  }

  const response = await fetch(`${config.url}/rest/v1/${BANNER_TABLE}?id=eq.${id}`, {
    method: "PATCH",
    headers: jsonHeaders(config),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  const banners = (await response.json()) as BlogBanner[];
  return { ok: true, data: banners[0] };
}

export async function deleteBlogBanner(id: string): Promise<BlogApiResult<null>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const response = await fetch(`${config.url}/rest/v1/${BANNER_TABLE}?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      ...adminHeaders(config),
      Prefer: "return=minimal",
    },
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  return { ok: true, data: null };
}

export async function uploadBlogBannerAsset(file: File): Promise<BlogApiResult<{ path: string; url: string }>> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Supabase 환경변수가 설정되지 않았습니다." };
  }

  const extension = file.name.split(".").pop() || "bin";
  const path = `banners/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const response = await fetch(`${config.url}/storage/v1/object/${config.storageBucket}/${path}`, {
    method: "POST",
    headers: {
      ...adminHeaders(config),
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: file,
  });

  if (!response.ok) {
    return { ok: false, status: response.status, message: await parseSupabaseError(response) };
  }

  return {
    ok: true,
    data: {
      path,
      url: `${config.url}/storage/v1/object/public/${config.storageBucket}/${path}`,
    },
  };
}
