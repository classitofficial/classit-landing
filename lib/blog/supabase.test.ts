import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPublicBlogPosts, getPublicFeaturedBlogPosts } from "./supabase";

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
    expect(url.searchParams.get("is_featured")).toBe("eq.true");
    expect(url.searchParams.get("order")).toBe(
      "featured_sort_order.asc.nullslast,published_at.desc.nullslast,created_at.desc",
    );
    expect(url.searchParams.has("limit")).toBe(false);
  });

  it("can query only the three most recent public blog posts", async () => {
    await getPublicBlogPosts({ limit: 3 });

    const url = requestedUrl();
    expect(url.pathname).toBe("/rest/v1/blog_posts");
    expect(url.searchParams.get("status")).toBe("eq.published");
    expect(url.searchParams.get("order")).toBe("published_at.desc.nullslast,created_at.desc");
    expect(url.searchParams.get("limit")).toBe("3");
  });
});
