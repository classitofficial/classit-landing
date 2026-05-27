import { describe, expect, it } from "vitest";
import { DEFAULT_OG_IMAGE, getOpenGraphImages } from "./shared-metadata";

describe("shared metadata", () => {
  it("falls back to the default OG image when a page has no thumbnail", () => {
    expect(getOpenGraphImages(null)).toEqual([DEFAULT_OG_IMAGE]);
  });

  it("uses a page thumbnail before the default OG image", () => {
    expect(getOpenGraphImages("https://cdn.classit.kr/blog/post.png")).toEqual([
      "https://cdn.classit.kr/blog/post.png",
      DEFAULT_OG_IMAGE,
    ]);
  });
});
