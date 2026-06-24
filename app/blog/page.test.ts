import { describe, expect, it } from "vitest";
import { metadata } from "./page";

describe("blog page metadata", () => {
  it("uses article-specific share metadata", () => {
    expect(metadata.title).toEqual({
      absolute: "클래스잇 | 아티클",
    });
    expect(metadata.description).toBe("효율적인 온라인 교육 운영을 위한 Classit 아티클입니다.");
    expect(metadata.openGraph).toMatchObject({
      title: "클래스잇 | 아티클",
      description: "효율적인 온라인 교육 운영을 위한 Classit 아티클입니다.",
      url: "/blog",
      type: "website",
      siteName: "Classit",
      locale: "ko_KR",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "클래스잇 | 아티클",
      description: "효율적인 온라인 교육 운영을 위한 Classit 아티클입니다.",
    });
  });
});
