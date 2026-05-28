import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ReviewsSection from "./ReviewsSection";

describe("ReviewsSection", () => {
  it("uses a two-column masonry layout from the tablet breakpoint", () => {
    const html = renderToStaticMarkup(<ReviewsSection />);

    expect(html).toContain("grid grid-cols-1 min-[769px]:grid-cols-2");
    expect(html).toContain("min-[769px]:grid-cols-2");
    expect(html).toContain("gap-5");
    expect(html).toContain("max-w-[900px]");
    expect(html).toContain("px-5 min-[769px]:px-0");
    expect(html).not.toContain("min-[1080px]:grid-cols-3");
  });

  it("renders four Figma review cards including the newly added review", () => {
    const html = renderToStaticMarkup(<ReviewsSection />);

    expect(html.match(/Enterprise Plan Review/g)).toHaveLength(4);
    expect(html).toContain("다정북스 곽희윤 강사");
    expect(html).toContain("#2만 수능 유튜버");
    expect(html).toContain("처음 노코더스에 문의를 남겼을 때는");
  });

  it("applies the review headline icon and Pretendard medium 14 style", () => {
    const html = renderToStaticMarkup(<ReviewsSection />);

    expect(html).toContain("size-5 shrink-0");
    expect(html).toContain("font-[&#x27;Pretendard&#x27;] text-[14px] font-medium leading-[21px] tracking-[-0.21px]");
  });

  it("uses the requested review card surface style", () => {
    const html = renderToStaticMarkup(<ReviewsSection />);

    expect(html).toContain("bg-[#0F1219]");
    expect(html).toContain("border-[#1B1F2A]");
    expect(html).toContain("rounded-[16px]");
  });
});
