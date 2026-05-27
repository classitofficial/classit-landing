export const DEFAULT_OG_IMAGE = {
  url: "/images/classit-og-1200x630.png",
  width: 1200,
  height: 630,
  alt: "Classit 온라인 클래스 운영 대시보드",
};

export const DEFAULT_TWITTER_IMAGE = "/images/classit-og-1200x630.png";

export function getOpenGraphImages(imageUrl?: string | null) {
  if (!imageUrl) return [DEFAULT_OG_IMAGE];

  return [imageUrl, DEFAULT_OG_IMAGE];
}
