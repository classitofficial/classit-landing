import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlogSidebarPromoCards from "./BlogSidebarPromoCards";
import type { BlogBanner } from "@/lib/blog/types";

function banner(overrides: Partial<BlogBanner> = {}): BlogBanner {
  return {
    id: "promo-banner",
    title: "온라인 강의 운영 상담",
    image_url: "https://example.com/banner.png",
    image_path: null,
    link_url: "https://classit.co.kr/contact",
    sort_order: 1,
    is_active: true,
    deleted_at: null,
    created_at: "2026-05-28T00:00:00.000Z",
    updated_at: "2026-05-28T00:00:00.000Z",
    ...overrides,
  };
}

describe("BlogSidebarPromoCards", () => {
  it("uses the banner title for promotional image alt text", async () => {
    const element = await BlogSidebarPromoCards({ managedBanners: [banner()] });
    const html = renderToStaticMarkup(element);

    expect(html).toContain('alt="온라인 강의 운영 상담 프로모션 배너"');
  });
});
