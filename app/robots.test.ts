import { describe, expect, it } from "vitest";
import robots from "./robots";
import { SITE_URL } from "./shared-metadata";

describe("robots metadata route", () => {
  it("allows crawlers and points them to the sitemap", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: `${SITE_URL}/sitemap.xml`,
    });
  });
});
