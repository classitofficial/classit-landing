import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  getPromotionCountdown,
  MobilePromotionFloating,
  PROMOTION_END_AT_MS,
} from "./Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("getPromotionCountdown", () => {
  it("formats the remaining promotion time", () => {
    const nowMs = PROMOTION_END_AT_MS - ((7 * 24 + 20) * 60 * 60 + 24 * 60 + 32) * 1000;

    expect(getPromotionCountdown(nowMs)).toEqual({
      days: 7,
      hours: 20,
      minutes: 24,
      seconds: 32,
      label: "D-7 20:24:32",
    });
  });

  it("returns null after the promotion ends", () => {
    expect(getPromotionCountdown(PROMOTION_END_AT_MS)).toBeNull();
  });
});

describe("MobilePromotionFloating", () => {
  it("renders the mobile promotion bar before the promotion ends", () => {
    const countdown = getPromotionCountdown(PROMOTION_END_AT_MS - 1000);

    const html = renderToStaticMarkup(
      <MobilePromotionFloating countdown={countdown} onInquiry={() => undefined} />,
    );

    expect(html).toContain("fixed bottom-0");
    expect(html).toContain("선착순 온라인 특가");
    expect(html).toContain("간편 문의하기");
  });

  it("renders nothing after the promotion ends", () => {
    const html = renderToStaticMarkup(
      <MobilePromotionFloating countdown={null} onInquiry={() => undefined} />,
    );

    expect(html).toBe("");
  });
});
