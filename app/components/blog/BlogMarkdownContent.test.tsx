import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlogHtmlContent, { buildBlogHtmlDocument, getBlogHtmlAnchorScrollY, getBlogHtmlMessageHeight } from "./BlogHtmlContent";
import BlogMarkdownContent, { normalizeBlogHtml } from "./BlogMarkdownContent";

function renderMarkdown(markdown: string) {
  return renderToStaticMarkup(<BlogMarkdownContent content={markdown} />);
}

describe("BlogMarkdownContent", () => {
  it("renders supported Markdown blocks and inline formatting", () => {
    const html = renderMarkdown(`# Title

## Section

### Detail

Plain **bold** and _italic_ text.

- Bullet one
- Bullet two

1. Ordered one
2. Ordered two

\`inline code\`

\`\`\`
code block
\`\`\`

---

> Quoted line`);

    expect(html).toContain("<h1");
    expect(html).toContain("Title</h1>");
    expect(html).toContain("<h2");
    expect(html).toContain("Section</h2>");
    expect(html).toContain("<h3");
    expect(html).toContain("Detail</h3>");
    expect(html).toContain("<strong");
    expect(html).toContain("bold</strong>");
    expect(html).toContain("<em");
    expect(html).toContain("italic</em>");
    expect(html).toContain("<ul");
    expect(html).toContain("<ol");
    expect(html).toContain("<li");
    expect(html).toContain("Bullet one");
    expect(html).toContain("Ordered one");
    expect(html).toContain("<code");
    expect(html).toContain("inline code");
    expect(html).toContain("<pre");
    expect(html).toContain("code block");
    expect(html).toContain("<hr");
    expect(html).toContain("<blockquote");
    expect(html).toContain("Quoted line");
  });

  it("renders images and normalizes protocol-relative image URLs", () => {
    const html = renderMarkdown("![Preview](//cdn.example.com/image.png)");

    expect(html).toContain("<img");
    expect(html).toContain('alt="Preview"');
    expect(html).toContain('src="https://cdn.example.com/image.png"');
  });

  it("renders links and preserves plain text line breaks", () => {
    const html = renderMarkdown(`Visit [Classit](https://classit.kr)
Next line`);

    expect(html).toContain('href="https://classit.kr"');
    expect(html).toContain(">Classit</a>");
    expect(html).toContain("<br");
    expect(html).toContain("Next line");
  });

  it("renders html content after extracting full document body", () => {
    const html = renderToStaticMarkup(
      <BlogMarkdownContent
        format={null}
        content={`<!doctype html>
<html>
  <head><title>Ignored</title></head>
  <body><section class="post"><h2>HTML 본문</h2><p>잘 보여야 합니다.</p></section></body>
</html>`}
      />,
    );

    expect(html).toContain("블로그 HTML 콘텐츠");
    expect(html).toContain("class=&quot;post&quot;");
    expect(html).toContain("HTML 본문");
    expect(html).toContain("잘 보여야 합니다.");
    expect(html).not.toContain("<body");
  });

  it("removes unsafe html before rendering", () => {
    const html = normalizeBlogHtml('<section onclick="alert(1)"><script>alert(1)</script><a href=javascript:alert(1)>link</a></section>');

    expect(html).toContain("<section>");
    expect(html).toContain(">link</a>");
    expect(html).not.toContain("onclick");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("javascript:");
  });

  it("hides embedded html scrollbars without clipping document overflow", () => {
    const document = buildBlogHtmlDocument("<style>body { overflow: auto; }</style><main style='border-radius: 32px'>HTML body</main>");
    const userOverflowIndex = document.indexOf("overflow: auto");
    const noScrollbarIndex = document.lastIndexOf("scrollbar-width: none !important");
    const html = renderToStaticMarkup(<BlogHtmlContent html="<main>HTML body</main>" />);

    expect(userOverflowIndex).toBeGreaterThan(-1);
    expect(noScrollbarIndex).toBeGreaterThan(userOverflowIndex);
    expect(document).toContain("body > *");
    expect(document).toContain("border-radius: 0 !important");
    expect(document.lastIndexOf("border-radius: 0 !important")).toBeGreaterThan(document.indexOf("border-radius: 32px"));
    expect(document).toContain("parent.postMessage");
    expect(document).not.toContain("background: #0B0E14");
    expect(document).not.toContain("overflow: hidden !important");
    expect(getBlogHtmlMessageHeight({ type: "classit-blog-html-resize", height: 4600 })).toBe(4600);
    expect(html).toContain('scrolling="no"');
    expect(html).toContain('sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"');
    expect(html).toContain('class="w-full"');
    expect(html).not.toContain("allow-same-origin");
    expect(html).not.toContain('class="w-full rounded');
    expect(html).not.toContain('class="w-full border');
    expect(html).not.toContain('class="w-full bg-[');
    expect(html).not.toContain('class="w-full overflow-hidden');
  });

  it("bridges embedded html table-of-contents hash links to the parent page scroll", () => {
    const document = buildBlogHtmlDocument('<nav><a href="#section-2">목차</a></nav><h2 id="section-2">섹션</h2>');

    expect(document).toContain("classit-blog-html-anchor-scroll");
    expect(document).toContain('a[href^="#"]');
    expect(document).toContain("parent.postMessage");
    expect(document).toContain("scrollY");
    expect(getBlogHtmlAnchorScrollY({ type: "classit-blog-html-anchor-scroll", scrollY: 300.2 })).toBe(301);
    expect(getBlogHtmlAnchorScrollY({ type: "classit-blog-html-anchor-scroll", scrollY: -10 })).toBe(0);
    expect(getBlogHtmlAnchorScrollY({ type: "classit-blog-html-resize", scrollY: 300 })).toBeNull();
  });
});
