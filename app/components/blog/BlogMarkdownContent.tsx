import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import type { Components, UrlTransform } from "react-markdown";
import remarkBreaks from "remark-breaks";

type BlogMarkdownContentProps = {
  content: string;
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

export default function BlogMarkdownContent({ content }: BlogMarkdownContentProps) {
  return (
    <div className="flex max-w-none flex-col gap-5">
      <ReactMarkdown
        allowedElements={["h1", "h2", "h3", "p", "strong", "blockquote", "img", "a", "br"]}
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
