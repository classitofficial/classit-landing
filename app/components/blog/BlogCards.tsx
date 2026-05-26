import Link from "next/link";
import { ClassitIcon } from "@/app/components/blog/BlogChrome";
import type { BlogPost } from "@/lib/blog/types";

export function formatDate(value: string | null) {
  if (!value) return "미발행";
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
}

function getContentPreview(post: BlogPost) {
  const text = post.content
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~\-]/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text || post.summary;
}

function Thumbnail({ post, className }: { post: BlogPost; className: string }) {
  if (post.thumbnail_url) {
    return <img src={post.thumbnail_url} alt="" draggable={false} className={`${className} object-cover`} />;
  }

  return (
    <div className={`${className} bg-[linear-gradient(135deg,#111827_0%,#0b0e14_48%,#123d91_100%)]`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(61,130,245,0.45),transparent_38%)]" />
    </div>
  );
}

export function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} draggable={false} className="group block">
      <article className="relative h-[350px] overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] md:h-[480px]">
        <Thumbnail post={post} className="absolute inset-0 size-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0)] to-[#121212]" />
        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 md:bottom-10 md:left-10 md:right-10">
          <h2 className="line-clamp-2 text-[20px] font-bold leading-7 tracking-[-0.5px] text-white md:text-[24px] md:leading-8">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-[14px] font-medium leading-[21px] tracking-[-0.35px] text-[#eaeaea] md:text-[16px] md:leading-6">
            {post.summary}
          </p>
        </div>
      </article>
    </Link>
  );
}

export function BlogGridCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex flex-col gap-5">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Thumbnail post={post} className="absolute inset-0 size-full" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="line-clamp-2 text-[18px] font-bold leading-7 tracking-[-0.45px] text-white">{post.title}</h3>
            <p className="line-clamp-3 text-[14px] font-medium leading-[21px] tracking-[-0.35px] text-[#eaeaea]">{post.summary}</p>
          </div>
          <PostMeta post={post} />
        </div>
      </article>
    </Link>
  );
}

export function BlogListItem({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="flex flex-col gap-5 md:flex-row md:gap-4">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl md:size-[148px] md:w-[148px]">
          <Thumbnail post={post} className="absolute inset-0 size-full" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4 md:justify-center md:gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="line-clamp-2 text-[18px] font-bold leading-7 tracking-[-0.45px] text-white md:line-clamp-1">{post.title}</h3>
            <p className="line-clamp-3 text-[14px] font-medium leading-[21px] tracking-[-0.35px] text-[#eaeaea]">{getContentPreview(post)}</p>
          </div>
          <PostMeta post={post} />
        </div>
      </article>
    </Link>
  );
}

export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-2 text-[14px] font-medium leading-[21px] tracking-[-0.14px] text-white">
      <ClassitIcon />
      <span>{formatDate(post.published_at || post.created_at)} · {post.author_name || "Classit"}</span>
    </div>
  );
}
