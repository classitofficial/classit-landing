import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlogSearchSection, { BLOG_NO_SEARCH_RESULTS_CLASS_NAME, shouldShowNoSearchResults } from "./BlogSearchSection";

describe("BlogSearchSection", () => {
  it("does not show an empty-result message before a search when there are no posts", () => {
    const html = renderToStaticMarkup(<BlogSearchSection posts={[]} />);

    expect(html).not.toContain("검색 결과가 없습니다.");
  });

  it("shows the empty-result message only after searching existing data", () => {
    expect(shouldShowNoSearchResults({ hasQuery: false, postCount: 0, visiblePostCount: 0 })).toBe(false);
    expect(shouldShowNoSearchResults({ hasQuery: true, postCount: 0, visiblePostCount: 0 })).toBe(false);
    expect(shouldShowNoSearchResults({ hasQuery: false, postCount: 3, visiblePostCount: 0 })).toBe(false);
    expect(shouldShowNoSearchResults({ hasQuery: true, postCount: 3, visiblePostCount: 1 })).toBe(false);
    expect(shouldShowNoSearchResults({ hasQuery: true, postCount: 3, visiblePostCount: 0 })).toBe(true);
  });

  it("keeps the empty-result message unframed per design feedback", () => {
    expect(BLOG_NO_SEARCH_RESULTS_CLASS_NAME).not.toContain("border");
    expect(BLOG_NO_SEARCH_RESULTS_CLASS_NAME).not.toContain("bg-");
  });
});
