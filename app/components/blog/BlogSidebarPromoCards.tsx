import { getPublicBlogBanners } from "@/lib/blog/supabase";
import type { BlogBanner } from "@/lib/blog/types";

function ManagedBannerCard({ banner }: { banner: BlogBanner }) {
  const image = <img src={banner.image_url} alt="" className="w-[330px] rounded-2xl border border-white/10 object-contain" />;

  if (!banner.link_url) {
    return image;
  }

  return (
    <a href={banner.link_url} target="_blank" rel="noreferrer" className="block w-[330px]">
      {image}
    </a>
  );
}

export default async function BlogSidebarPromoCards({ managedBanners }: { managedBanners?: BlogBanner[] }) {
  const banners = managedBanners || (await getPublicBlogBanners());

  if (banners.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[132px]">
        <div className="flex max-h-[calc(100svh-156px)] flex-col gap-5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {banners.map((banner) => (
            <ManagedBannerCard key={banner.id} banner={banner} />
          ))}
        </div>
      </div>
    </aside>
  );
}
