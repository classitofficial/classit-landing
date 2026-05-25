import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlogMarkdownContent from "./BlogMarkdownContent";

function renderMarkdown(markdown: string) {
  return renderToStaticMarkup(<BlogMarkdownContent content={markdown} />);
}

describe("BlogMarkdownContent", () => {
  it("renders supported Markdown blocks and inline formatting", () => {
    const html = renderMarkdown(`# Title

## Section

### Detail

Plain **bold** text.

> Quoted line`);

    expect(html).toContain("<h1");
    expect(html).toContain("Title</h1>");
    expect(html).toContain("<h2");
    expect(html).toContain("Section</h2>");
    expect(html).toContain("<h3");
    expect(html).toContain("Detail</h3>");
    expect(html).toContain("<strong");
    expect(html).toContain("bold</strong>");
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
});
