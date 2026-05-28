import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogListItem, PostMeta } from "@/app/components/blog/BlogCards";
import { BlogShell } from "@/app/components/blog/BlogChrome";
import BlogMarkdownContent from "@/app/components/blog/BlogMarkdownContent";
import { getOpenGraphImages } from "@/app/shared-metadata";
import { getPublicBlogPostBySlug, getPublicBlogPosts } from "@/lib/blog/supabase";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "블로그",
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.summary,
      url: `/blog/${post.slug}`,
      type: "article",
      siteName: "Classit",
      locale: "ko_KR",
      images: getOpenGraphImages(post.thumbnail_url),
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPublicBlogPostBySlug(slug), getPublicBlogPosts()]);

  if (!post) notFound();

  const morePosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <BlogShell>
      <article className="mx-auto flex w-full max-w-[680px] flex-col gap-[52px] px-5 pb-[104px] pt-[144px] md:px-5 md:pb-36 md:pt-[172px]">
        <header className="flex flex-col gap-3">
          <h1 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white md:text-[32px] md:leading-[44px]">
            {post.title}
          </h1>
          <PostMeta post={post} />
        </header>

        {post.thumbnail_url && (
          <img src={post.thumbnail_url} alt="" className="max-h-[520px] w-full rounded-2xl object-cover" />
        )}

        <BlogMarkdownContent content={post.content} format={post.content_format} />

        <Link
          href="/blog"
          className="w-fit rounded-2xl border border-[#3d82f5] px-4 py-[14px] text-[14px] font-bold leading-[21px] text-[#3d82f5]"
        >
          목록으로
        </Link>

        {morePosts.length > 0 && (
          <>
            <div className="border-t border-dashed border-[#1b1f2a]" />
            <section className="flex flex-col gap-[52px]">
              <h2 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white md:text-[32px] md:leading-[44px]">
                더 많은 블로그
              </h2>
              <div className="flex flex-col gap-8">
                {morePosts.map((item) => (
                  <BlogListItem key={item.id} post={item} />
                ))}
              </div>
            </section>
          </>
        )}
      </article>
    </BlogShell>
  );
}
