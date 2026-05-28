"use client";

import { useState } from "react";

type BlogHtmlContentProps = {
  html: string;
};

function extractHtmlBody(html: string) {
  const styleBlocks = Array.from(html.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi))
    .map((match) => match[0])
    .join("");
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) return html;

  return `${styleBlocks}${bodyMatch[1]}`;
}

export function normalizeBlogHtml(html: string) {
  return extractHtmlBody(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed\b[^>]*>/gi, "")
    .replace(/<base\b[^>]*>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/\s+srcdoc\s*=\s*"[^"]*"/gi, "")
    .replace(/\s+srcdoc\s*=\s*'[^']*'/gi, "")
    .replace(/\s+(href|src)\s*=\s*"javascript:[^"]*"/gi, "")
    .replace(/\s+(href|src)\s*=\s*'javascript:[^']*'/gi, "")
    .replace(/\s+(href|src)\s*=\s*javascript:[^\s>]+/gi, "");
}

export function buildBlogHtmlDocument(html: string) {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    html, body { margin: 0; padding: 0; background: #0B0E14; }
    img, video { max-width: 100%; height: auto; }
  </style>
</head>
<body>
${normalizeBlogHtml(html)}
</body>
</html>`;
}

export default function BlogHtmlContent({ html }: BlogHtmlContentProps) {
  const [height, setHeight] = useState(720);

  return (
    <iframe
      title="블로그 HTML 콘텐츠"
      className="w-full overflow-hidden rounded-2xl border border-[#1b1f2a] bg-[#0b0e14]"
      srcDoc={buildBlogHtmlDocument(html)}
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      style={{ height }}
      onLoad={(event) => {
        const body = event.currentTarget.contentDocument?.body;
        const documentElement = event.currentTarget.contentDocument?.documentElement;
        const nextHeight = Math.max(body?.scrollHeight ?? 0, documentElement?.scrollHeight ?? 0, 720);
        setHeight(nextHeight);
      }}
    />
  );
}
