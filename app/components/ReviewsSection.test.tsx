import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ReviewsSection from "./ReviewsSection";

describe("ReviewsSection", () => {
  it("uses one column up to 768px, two columns below 1080px, and three columns from 1080px", () => {
    const html = renderToStaticMarkup(<ReviewsSection />);

    expect(html).toContain("grid grid-cols-1");
    expect(html).toContain("min-[769px]:grid-cols-2");
    expect(html).toContain("min-[1080px]:grid-cols-3");
    expect(html).toContain("gap-2");
  });

  it("applies the review headline gradient button and Pretendard bold 14 style", () => {
    const html = renderToStaticMarkup(<ReviewsSection />);

    expect(html).toContain("btn-gradient btn-gradient-blue");
    expect(html).toContain("font-[&#x27;Pretendard&#x27;] text-[14px] font-bold leading-[21px] text-[var(--_,#F8FAFF)]");
  });

  it("uses the requested review card surface style", () => {
    const html = renderToStaticMarkup(<ReviewsSection />);

    expect(html).toContain("bg-[#0F1219]");
    expect(html).toContain("border-[#1B1F2A]");
    expect(html).toContain("rounded-[16px]");
  });
});
