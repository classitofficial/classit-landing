import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import LegalPage from "./LegalPage";

vi.mock("@/app/components/Header", () => ({ default: () => <header /> }), { virtual: true });
vi.mock("@/app/components/Footer", () => ({ default: () => <footer /> }), { virtual: true });
vi.mock("next/navigation", () => ({
  usePathname: () => "/privacy",
  useRouter: () => ({ push: vi.fn() }),
}));

function renderLegalPage(addendum: string) {
  return renderToStaticMarkup(
    <LegalPage title="개인정보처리방침" effectiveDate="2026년 4월 20일" sections={[]} addendum={addendum} />,
  );
}

describe("LegalPage", () => {
  it("preserves addendum line breaks", () => {
    const html = renderLegalPage("첫 문단\n\n- 공고 일자: 2026년 4월 20일");

    expect(html).toContain("whitespace-pre-wrap");
    expect(html).toContain("첫 문단\n\n- 공고 일자");
  });

  it("converts escaped newline sequences from JSX attributes", () => {
    const html = renderLegalPage("첫 문단\\n\\n- 공고 일자: 2026년 4월 20일");

    expect(html).toContain("첫 문단\n\n- 공고 일자");
    expect(html).not.toContain("\\n");
  });
});
