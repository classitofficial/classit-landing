import type { Metadata } from "next";
import { BlogGridCard } from "@/app/components/blog/BlogCards";
import BlogFeaturedCarousel from "@/app/components/blog/BlogFeaturedCarousel";
import BlogSearchSection from "@/app/components/blog/BlogSearchSection";
import BlogSidebarPromoCards from "@/app/components/blog/BlogSidebarPromoCards";
import { BlogShell } from "@/app/components/blog/BlogChrome";
import { getBlogIndexPosts } from "@/lib/blog/selection";
import { getPublicBlogBanners, getPublicBlogPosts, getPublicFeaturedBlogPosts } from "@/lib/blog/supabase";

export const metadata: Metadata = {
  title: {
    absolute: "클래스잇 | 블로그",
  },
  description: "효율적인 온라인 교육 운영을 위한 Classit 블로그입니다.",
  alternates: {
    canonical: "/blog",
  },
};

const Divider = () => {
  return (
    <div className="w-full h-px" style={{
      background: "linear-gradient(90deg, rgba(94,103,122,0) 0%, rgba(94,103,122,0.4) 49.52%, rgba(94,103,122,0) 100%)"}} 
    />
  );
}

export default async function BlogPage() {
  const [posts, featuredPosts, managedBanners] = await Promise.all([
    getPublicBlogPosts(),
    getPublicFeaturedBlogPosts(),
    getPublicBlogBanners(),
  ]);
  const { regularPosts, topPosts } = getBlogIndexPosts(posts);
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

        {featuredPosts.length > 0 && <BlogFeaturedCarousel posts={featuredPosts} />}

        {topPosts.length > 0 && (
          <div className="relative -mx-5 overflow-x-auto overscroll-x-contain pb-1 snap-x snap-mandatory [scrollbar-width:none] md:mx-0 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 md:grid md:auto-cols-fr md:grid-flow-row md:grid-cols-3 md:gap-5">
              {topPosts.map((post, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === topPosts.length - 1;
                // 모바일: 처음은 왼쪽 20px(p-5), 마지막은 오른쪽 20px(p-5)
                // 카드 크기 350px 고정(모바일에서)
                const paddingClass = [
                  isFirst ? "pl-5" : "",
                  isLast ? "pr-5" : "",
                  "md:pl-0 md:pr-0"
                ].join(" ");
                return (
                  <div
                    key={post.id}
                    className={`snap-start flex-shrink-0 w-[350px] max-w-[350px] md:w-auto ${paddingClass}`}
                  >
                    <BlogGridCard post={post} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Divider/>

        <div className={contentGridClassName}>
          <BlogSearchSection posts={regularPosts} />

          {managedBanners.length > 0 && <BlogSidebarPromoCards managedBanners={managedBanners} />}
        </div>
      </section>
    </BlogShell>
  );
}
