import type { Metadata } from "next";
import { BlogGridCard } from "@/app/components/blog/BlogCards";
import BlogFeaturedCarousel from "@/app/components/blog/BlogFeaturedCarousel";
import BlogSearchSection from "@/app/components/blog/BlogSearchSection";
import BlogSidebarPromoCards from "@/app/components/blog/BlogSidebarPromoCards";
import { BlogShell } from "@/app/components/blog/BlogChrome";
import { getPublicBlogPosts } from "@/lib/blog/supabase";

export const metadata: Metadata = {
  title: "블로그",
  description: "효율적인 온라인 교육 운영을 위한 Classit 블로그입니다.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPublicBlogPosts();
  const featuredPosts = posts.slice(0, 4);
  const rest = posts.slice(featuredPosts.length);
  const topPosts = rest.slice(0, 3);

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

        {featuredPosts.length > 0 ? (
          <BlogFeaturedCarousel posts={featuredPosts} />
        ) : (
          <div className="rounded-2xl border border-[#1b1f2a] bg-[#0f1219] p-10 text-center text-[#a9b1c1]">
            게시된 블로그 글이 없습니다.
          </div>
        )}

        {topPosts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-3 md:gap-5">
            {topPosts.map((post) => (
              <BlogGridCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="grid gap-[52px] lg:grid-cols-[1fr_330px]">
          <BlogSearchSection posts={posts} />

          <BlogSidebarPromoCards />
        </div>
      </section>
    </BlogShell>
  );
}
