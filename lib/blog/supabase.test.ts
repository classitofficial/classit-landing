import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPublicBlogBanners, getPublicBlogPostBySlug, getPublicBlogPosts, getPublicFeaturedBlogPosts } from "./supabase";

const originalFetch = globalThis.fetch;

function mockEmptyFetch() {
  globalThis.fetch = vi.fn(async () => ({
    ok: true,
    json: async () => [],
  })) as unknown as typeof fetch;
}

function requestedUrl() {
  const fetchMock = vi.mocked(globalThis.fetch);
  const [input] = fetchMock.mock.calls[0];
  return new URL(String(input));
}

describe("public blog Supabase queries", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://classit.supabase.co/");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "publishable-key");
    mockEmptyFetch();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
  });

  it("queries administrator-selected featured posts without a fixed limit", async () => {
    await getPublicFeaturedBlogPosts();

    const url = requestedUrl();
    expect(url.pathname).toBe("/rest/v1/blog_posts");
    expect(url.searchParams.get("status")).toBe("eq.published");
    expect(url.searchParams.get("deleted_at")).toBe("is.null");
    expect(url.searchParams.get("is_featured")).toBe("eq.true");
    expect(url.searchParams.get("order")).toBe("published_at.desc.nullslast,created_at.desc");
    expect(url.searchParams.has("limit")).toBe(false);
  });

  it("can query only the three most recent public blog posts", async () => {
    await getPublicBlogPosts({ limit: 3 });

    const url = requestedUrl();
    expect(url.pathname).toBe("/rest/v1/blog_posts");
    expect(url.searchParams.get("status")).toBe("eq.published");
    expect(url.searchParams.get("deleted_at")).toBe("is.null");
    expect(url.searchParams.get("order")).toBe("published_at.desc.nullslast,created_at.desc");
    expect(url.searchParams.get("limit")).toBe("3");
  });

  it("excludes soft-deleted blog posts from slug lookups", async () => {
    await getPublicBlogPostBySlug("classit-html-sample");

    const url = requestedUrl();
    expect(url.pathname).toBe("/rest/v1/blog_posts");
    expect(url.searchParams.get("slug")).toBe("eq.classit-html-sample");
    expect(url.searchParams.get("status")).toBe("eq.published");
    expect(url.searchParams.get("deleted_at")).toBe("is.null");
  });

  it("excludes soft-deleted promo banners", async () => {
    await getPublicBlogBanners();

    const url = requestedUrl();
    expect(url.pathname).toBe("/rest/v1/blog_promo_banners");
    expect(url.searchParams.get("is_active")).toBe("eq.true");
    expect(url.searchParams.get("deleted_at")).toBe("is.null");
  });
});
