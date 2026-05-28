"use client";

import { useEffect, useRef, useState } from "react";

type BlogHtmlContentProps = {
  html: string;
};

const MIN_HTML_FRAME_HEIGHT = 720;
const BLOG_HTML_RESIZE_MESSAGE_TYPE = "classit-blog-html-resize";
const BLOG_HTML_NO_SCROLLBAR_STYLE = `
  <style>
    html,
    body {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }

    html::-webkit-scrollbar,
    body::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }

    body > * {
      border-radius: 0 !important;
    }
  </style>`;
const BLOG_HTML_AUTO_RESIZE_SCRIPT = `
  <script>
    (() => {
      const minHeight = ${MIN_HTML_FRAME_HEIGHT};
      const messageType = "${BLOG_HTML_RESIZE_MESSAGE_TYPE}";
      const watchedMedia = new WeakSet();

      const measureHeight = () => {
        const body = document.body;
        const documentElement = document.documentElement;

        return Math.ceil(Math.max(
          body?.scrollHeight || 0,
          body?.offsetHeight || 0,
          documentElement?.scrollHeight || 0,
          documentElement?.offsetHeight || 0,
          minHeight,
        ));
      };

      const postHeight = () => {
        parent.postMessage({ type: messageType, height: measureHeight() }, "*");
      };

      const scheduleHeight = () => {
        window.requestAnimationFrame(postHeight);
      };

      const watchMedia = () => {
        document.querySelectorAll("img, video").forEach((element) => {
          if (watchedMedia.has(element)) return;
          watchedMedia.add(element);
          element.addEventListener("load", scheduleHeight);
          element.addEventListener("error", scheduleHeight);
          element.addEventListener("loadedmetadata", scheduleHeight);
        });
      };

      window.addEventListener("load", scheduleHeight);
      window.addEventListener("resize", scheduleHeight);
      document.addEventListener("DOMContentLoaded", scheduleHeight);

      if (document.fonts?.ready) {
        document.fonts.ready.then(scheduleHeight).catch(() => {});
      }

      if ("ResizeObserver" in window) {
        const resizeObserver = new ResizeObserver(scheduleHeight);
        resizeObserver.observe(document.documentElement);
        if (document.body) resizeObserver.observe(document.body);
      }

      if ("MutationObserver" in window) {
        const mutationObserver = new MutationObserver(() => {
          watchMedia();
          scheduleHeight();
        });
        mutationObserver.observe(document.documentElement, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
        });
      }

      watchMedia();
      scheduleHeight();
      window.setTimeout(scheduleHeight, 50);
      window.setTimeout(scheduleHeight, 250);
      window.setTimeout(scheduleHeight, 1000);
    })();
  </script>`;

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
    html, body { margin: 0; padding: 0; }
    img, video { max-width: 100%; height: auto; }
  </style>
</head>
<body>
${normalizeBlogHtml(html)}
${BLOG_HTML_NO_SCROLLBAR_STYLE}
${BLOG_HTML_AUTO_RESIZE_SCRIPT}
</body>
</html>`;
}

export function getBlogHtmlMessageHeight(value: unknown) {
  if (!value || typeof value !== "object") return null;

  const message = value as { height?: unknown; type?: unknown };
  if (message.type !== BLOG_HTML_RESIZE_MESSAGE_TYPE) return null;
  if (typeof message.height !== "number" || !Number.isFinite(message.height)) return null;

  return Math.max(Math.ceil(message.height), MIN_HTML_FRAME_HEIGHT);
}

export default function BlogHtmlContent({ html }: BlogHtmlContentProps) {
  const [heightState, setHeightState] = useState({ height: MIN_HTML_FRAME_HEIGHT, html });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const height = heightState.html === html ? heightState.height : MIN_HTML_FRAME_HEIGHT;

  useEffect(() => {
    const handleResizeMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;

      const nextHeight = getBlogHtmlMessageHeight(event.data);
      if (nextHeight === null) return;

      setHeightState((current) => {
        if (current.html === html && current.height === nextHeight) return current;
        return { height: nextHeight, html };
      });
    };

    window.addEventListener("message", handleResizeMessage);

    return () => {
      window.removeEventListener("message", handleResizeMessage);
    };
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      title="블로그 HTML 콘텐츠"
      className="w-full"
      srcDoc={buildBlogHtmlDocument(html)}
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
      scrolling="no"
      style={{ height }}
    />
  );
}
