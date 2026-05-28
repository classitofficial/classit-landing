import { describe, expect, it } from "vitest";
import { getBlogContentPreview } from "./preview";

describe("getBlogContentPreview", () => {
  it("extracts readable body text from a full html document", () => {
    const preview = getBlogContentPreview({
      content: `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <title>메타 제목</title>
    <style>.hidden { color: red; }</style>
    <script>alert("x")</script>
  </head>
  <body>
    <article>
      <h1>입시 학원의 현명한 선택</h1>
      <p>외주 개발과 LMS 솔루션을 비교합니다.</p>
    </article>
  </body>
</html>`,
    });

    expect(preview).toBe("입시 학원의 현명한 선택 외주 개발과 LMS 솔루션을 비교합니다.");
  });

  it("keeps markdown text readable", () => {
    const preview = getBlogContentPreview({
      content: `# 제목

- **굵은 내용**
- [클래스잇](https://classit.kr)`,
    });

    expect(preview).toBe("제목 굵은 내용 클래스잇");
  });
});
