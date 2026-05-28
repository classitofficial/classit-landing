import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import type { Components, UrlTransform } from "react-markdown";
import remarkBreaks from "remark-breaks";
import BlogHtmlContent, { normalizeBlogHtml } from "./BlogHtmlContent";

export { normalizeBlogHtml };

type BlogMarkdownContentProps = {
  content: string;
  format?: "markdown" | "html" | null;
};

function normalizeImageUrl(url: string | Blob | undefined) {
  if (typeof url !== "string") return undefined;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

const markdownUrlTransform: UrlTransform = (url, key, node) => {
  void node;

  const normalizedUrl = key === "src" ? normalizeImageUrl(url) || "" : url;
  return defaultUrlTransform(normalizedUrl);
};

const markdownComponents: Components = {
  h1({ node, children, ...props }) {
    void node;
    return (
      <h1 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white md:text-[32px] md:leading-[44px]" {...props}>
        {children}
      </h1>
    );
  },
  h2({ node, children, ...props }) {
    void node;
    return (
      <h2 className="pt-3 text-[24px] font-bold leading-8 tracking-[-0.6px] text-white md:text-[28px] md:leading-9" {...props}>
        {children}
      </h2>
    );
  },
  h3({ node, children, ...props }) {
    void node;
    return (
      <h3 className="pt-2 text-[20px] font-bold leading-7 tracking-[-0.5px] text-white md:text-[22px] md:leading-8" {...props}>
        {children}
      </h3>
    );
  },
  p({ node, children, ...props }) {
    void node;
    return (
      <p className="text-[16px] font-medium leading-7 tracking-[-0.16px] text-white" {...props}>
        {children}
      </p>
    );
  },
  strong({ node, children, ...props }) {
    void node;
    return (
      <strong className="font-bold text-white" {...props}>
        {children}
      </strong>
    );
  },
  em({ node, children, ...props }) {
    void node;
    return (
      <em className="italic text-white" {...props}>
        {children}
      </em>
    );
  },
  ul({ node, children, ...props }) {
    void node;
    return (
      <ul className="flex list-disc flex-col gap-2 pl-6 text-[16px] font-medium leading-7 text-white" {...props}>
        {children}
      </ul>
    );
  },
  ol({ node, children, ...props }) {
    void node;
    return (
      <ol className="flex list-decimal flex-col gap-2 pl-6 text-[16px] font-medium leading-7 text-white" {...props}>
        {children}
      </ol>
    );
  },
  li({ node, children, ...props }) {
    void node;
    return (
      <li className="pl-1" {...props}>
        {children}
      </li>
    );
  },
  code({ node, className, children, ...props }) {
    void node;
    return (
      <code className={`rounded-md bg-[#151a24] px-1.5 py-0.5 font-mono text-[14px] text-[#f8faff] ${className ?? ""}`} {...props}>
        {children}
      </code>
    );
  },
  pre({ node, children, ...props }) {
    void node;
    return (
      <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0f1219] p-4 text-[14px] leading-6 text-[#f8faff]" {...props}>
        {children}
      </pre>
    );
  },
  hr({ node, ...props }) {
    void node;
    return <hr className="border-white/10" {...props} />;
  },
  blockquote({ node, children, ...props }) {
    void node;
    return (
      <blockquote className="rounded-2xl border-l-4 border-[#3d82f5] bg-[#0f1219] px-5 py-4 text-[#eaeaea]" {...props}>
        {children}
      </blockquote>
    );
  },
  a({ node, children, ...props }) {
    void node;
    return (
      <a className="font-bold text-[#3d82f5] underline underline-offset-4" target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img({ node, src, alt, ...props }) {
    void node;
    return (
      <img
        src={normalizeImageUrl(src)}
        alt={alt || ""}
        loading="lazy"
        className="my-3 h-auto max-h-[640px] w-auto max-w-full rounded-2xl border border-white/10 object-contain"
        {...props}
      />
    );
  },
};

export function inferBlogContentFormat(content: string): "markdown" | "html" {
  return /^\s*(<!doctype\s+html|<html\b|<body\b|<article\b|<section\b|<div\b|<main\b|<p\b|<h[1-6]\b)/i.test(content) ? "html" : "markdown";
}

export default function BlogMarkdownContent({ content, format }: BlogMarkdownContentProps) {
  const resolvedFormat = format ?? inferBlogContentFormat(content);

  if (resolvedFormat === "html") {
    return <BlogHtmlContent html={content} />;
  }

  return (
    <div className="flex max-w-none flex-col gap-5">
      <ReactMarkdown
        allowedElements={["h1", "h2", "h3", "p", "strong", "em", "ul", "ol", "li", "code", "pre", "hr", "blockquote", "img", "a", "br"]}
        components={markdownComponents}
        remarkPlugins={[remarkBreaks]}
        skipHtml
        urlTransform={markdownUrlTransform}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
