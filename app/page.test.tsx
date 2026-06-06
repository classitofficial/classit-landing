import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";
import { SITE_URL } from "./shared-metadata";

vi.mock("@/app/components/page/Index", () => ({
  default: () => null,
}));

describe("Home", () => {
  it("renders Organization and SoftwareApplication JSON-LD", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@context":"https://schema.org"');
    expect(html).toContain('"@type":"Organization"');
    expect(html).toContain('"@type":"SoftwareApplication"');
  });

  it("uses SITE_URL for canonical url and local favicon logo", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain(`"url":"${SITE_URL}"`);
    expect(html).toContain(`"logo":"${SITE_URL}/images/favicon.png"`);
    expect(html).not.toContain("bubble.io");
  });

  it("does not point Organization sameAs at its own blog", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).not.toContain(`"sameAs":["${SITE_URL}/blog"]`);
  });

  it("trims knowsAbout to the curated keyword list", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain(
      '"knowsAbout":["인터넷 강의 플랫폼","온라인 학원","온라인 클래스","학원 홈페이지","LMS","수강생 관리","학원 출결 관리","학원 결제","학원 AI","화면 녹화 방지"]',
    );
  });
});
