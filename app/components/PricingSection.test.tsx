import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PricingSection from "./PricingSection";

describe("PricingSection", () => {
  it("matches the latest plan card copy from Figma", () => {
    const html = renderToStaticMarkup(<PricingSection />);

    expect(html).toContain("개설비(최초 1회)");
    expect(html).not.toContain("초기 세팅비(최초 1회)");
    expect(html).toContain("990,000원");
    expect(html).toContain("44%");
    expect(html).toContain("440,000원");
    expect(html).toContain("11%");
    expect(html).toContain("* 온라인 신청 전용 할인가입니다.");
    expect(html).toContain("별도 협의");
  });

  it("keeps the desktop plan cards aligned from the same height slot", () => {
    const html = renderToStaticMarkup(<PricingSection />);

    expect(html).toContain("items-stretch justify-center");
    expect(html).toContain("h-[60px] shrink-0");
    expect(html).toContain("h-1 shrink-0");
    expect(html).not.toContain("h-[610px]");
  });
});
