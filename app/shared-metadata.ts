export const SITE_URL = "https://www.classit.co.kr";

export const SITE_DESCRIPTION =
  "클래스잇은 온라인 강의 사이트 제작부터 수강생 관리, 결제, 보안, 알림톡 자동화까지 한 번에 제공하는 교육 플랫폼입니다.";

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
