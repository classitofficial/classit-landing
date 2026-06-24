import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogListItem, PostMeta } from "@/app/components/blog/BlogCards";
import { BlogShell } from "@/app/components/blog/BlogChrome";
import BlogMarkdownContent from "@/app/components/blog/BlogMarkdownContent";
import { DEFAULT_OG_IMAGE, getOpenGraphImages, SITE_URL } from "@/app/shared-metadata";
import { getPublicBlogPostBySlug, getPublicBlogPosts } from "@/lib/blog/supabase";
import type { BlogPost } from "@/lib/blog/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const toAbsoluteSiteUrl = (path: string) => new URL(path, SITE_URL).toString();

const getBlogPostJsonLd = (post: BlogPost) => {
  const postUrl = toAbsoluteSiteUrl(`/blog/${post.slug}`);
  const fallbackImageUrl = toAbsoluteSiteUrl(DEFAULT_OG_IMAGE.url);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.seo_title || post.title,
    "description": post.seo_description || post.summary,
    "image": [post.thumbnail_url || fallbackImageUrl],
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Person",
      "name": post.author_name || "Classit",
    },
    "publisher": {
      "@type": "Organization",
      "name": "클래스잇",
      "logo": {
        "@type": "ImageObject",
        "url": toAbsoluteSiteUrl("/images/favicon.png"),
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "url": postUrl,
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "아티클",
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
  const blogPostJsonLd = getBlogPostJsonLd(post);

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto flex w-full max-w-[680px] flex-col gap-[52px] px-5 pb-[104px] pt-[144px] md:px-5 md:pb-36 md:pt-[172px]">
        <header className="flex flex-col gap-3">
          <h1 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-white">
            {post.title}
          </h1>
          <PostMeta post={post} />
        </header>

        <BlogMarkdownContent content={post.content} format={post.content_format} />

        <Link
          href="/blog"
          className="w-fit rounded-2xl border border-[#3d82f5] px-4 py-[14px] text-[14px] font-bold leading-[21px] text-[#3d82f5]"
        >
          목록으로
        </Link>

        {morePosts.length > 0 && (
          <>
            <div
              className="h-px w-full"
              style={{
                background: "linear-gradient(90deg, rgba(94,103,122,0) 0%, rgba(94,103,122,0.4) 49.52%, rgba(94,103,122,0) 100%)",
              }}
            />
            <section className="flex flex-col gap-[52px]">
              <h2 className="text-[20px] font-bold leading-7 tracking-[-0.5px] text-white">
                더 많은 아티클
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
