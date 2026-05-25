import type { Metadata } from "next";
import { BlogGridCard } from "@/app/components/blog/BlogCards";
import BlogFeaturedCarousel from "@/app/components/blog/BlogFeaturedCarousel";
import BlogSearchSection from "@/app/components/blog/BlogSearchSection";
import BlogSidebarPromoCards from "@/app/components/blog/BlogSidebarPromoCards";
import { BlogShell } from "@/app/components/blog/BlogChrome";
import { getBlogIndexPosts } from "@/lib/blog/selection";
import { getPublicBlogBanners, getPublicBlogPosts, getPublicFeaturedBlogPosts } from "@/lib/blog/supabase";

export const metadata: Metadata = {
  title: "블로그",
  description: "효율적인 온라인 교육 운영을 위한 Classit 블로그입니다.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const [posts, featuredPosts, managedBanners] = await Promise.all([
    getPublicBlogPosts(),
    getPublicFeaturedBlogPosts(),
    getPublicBlogBanners(),
  ]);
  const { regularPosts, topPosts } = getBlogIndexPosts(posts, featuredPosts);
  const contentGridClassName =
    managedBanners.length > 0 ? "grid gap-[52px] lg:grid-cols-[1fr_330px]" : "grid gap-[52px]";
  return (
    <BlogShell>
      <section className="mx-auto flex w-full max-w-[1090px] flex-col gap-[52px] px-5 pb-[104px] pt-[144px] md:px-10 md:pb-36 md:pt-[172px]">
        <div className="text-center">
          <h1 className="text-[28px] font-bold leading-9 tracking-[-0.42px] text-[#fefefe]">
            효율적인 온라인 교육 운영
            <br />
            클래스잇 블로그
          </h1>
        </div>

        {posts.length === 0 && (
          <div className="rounded-2xl border border-[#1b1f2a] bg-[#0f1219] p-10 text-center text-[#a9b1c1]">
            게시된 블로그 글이 없습니다.
          </div>
        )}

        {featuredPosts.length > 0 && <BlogFeaturedCarousel posts={featuredPosts} />}

        {topPosts.length > 0 && (
          <div className="grid auto-cols-[calc(100vw-64px)] grid-flow-col gap-4 overflow-x-auto overscroll-x-contain pb-1 snap-x snap-mandatory [scrollbar-width:none] md:auto-cols-fr md:grid-flow-row md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
            {topPosts.map((post) => (
              <div key={post.id} className="snap-start">
                <BlogGridCard post={post} />
              </div>
            ))}
          </div>
        )}

        <div className={contentGridClassName}>
          <BlogSearchSection posts={regularPosts} />

          {managedBanners.length > 0 && <BlogSidebarPromoCards managedBanners={managedBanners} />}
        </div>
      </section>
    </BlogShell>
  );
}
