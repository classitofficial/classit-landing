import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DesignFeedbackWidget } from "./components/dev/DesignFeedbackWidget";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE, SITE_URL } from "./shared-metadata";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  // 상대 경로로 적은 canonical, OG 이미지 URL 등을 실제 공유 도메인 기준의 절대 URL로 변환합니다.
  metadataBase: new URL(SITE_URL),
  // 브라우저 탭과 검색 결과 제목에 쓰이며, 하위 페이지가 title을 지정하면 template이 적용됩니다.
  title: {
    default: "클래스잇",
    template: "%s | Classit",
  },
  // 검색 결과 설명과 SNS 공유 설명의 기본 문구입니다.
  description:
    "인터넷 강의 수강, AI 수강생 관리, 결제 및 알림톡 자동화까지 온라인 학원 운영 솔루션 클래스잇",
  // 브라우저나 OS가 앱/사이트 이름을 표시할 때 사용하는 이름입니다.
  applicationName: "Classit",
  // 검색엔진에 페이지 주제를 보조적으로 알려주는 키워드입니다.
  keywords: [
    "인터넷 강의",
    "인강",
    "온라인 클래스",
    "온라인 강의 사이트",
    "온라인 강의 플랫폼",
    "인강 사이트",
    "학원 홈페이지",
    "학원 홈페이지 제작",
    "온라인 학원",
    "교육 플랫폼",
  ],
  // 대표 URL을 하나로 지정해 중복 URL 평가가 분산되지 않게 합니다.
  alternates: {
    canonical: "/",
  },
  // 검색엔진이 이 페이지를 색인하고 링크를 따라가도록 허용합니다.
  robots: {
    index: true,
    follow: true,
  },
  // 네이버 서치어드바이저 소유권 확인용 메타 태그입니다.
  verification: {
    other: {
      "naver-site-verification": "b1700c2954dd2fadb94823a47ed0b5b33cf770cb",
    },
  },
  // 브라우저 탭, 북마크, 검색 결과 등에 쓰이는 사이트 아이콘입니다.
  icons: {
    icon: "/images/favicon.png",
  },
  // 카카오톡, Slack, Facebook 등에서 공유될 때 쓰이는 Open Graph 미리보기 정보입니다.
  openGraph: {
    // 공유 카드의 제목입니다.
    title: "클래스잇",
    // 공유 카드에 표시되는 사이트 이름입니다.
    siteName: "Classit",
    // 공유 카드의 설명 문구입니다.
    description:
      "인터넷 강의 수강, AI 수강생 관리, 결제 및 알림톡 자동화까지 온라인 학원 운영 솔루션 클래스잇",
    // 공유 카드가 가리키는 대표 URL입니다.
    url: "/",
    // 랜딩 페이지처럼 일반 웹사이트 페이지임을 나타냅니다.
    type: "website",
    // 한국어/한국 지역 콘텐츠임을 나타냅니다.
    locale: "ko_KR",
    // 공유 카드에 표시될 대표 이미지입니다.
    images: [
      DEFAULT_OG_IMAGE,
    ],
  },
  // X(Twitter)에서 공유될 때 쓰이는 카드 미리보기 정보입니다.
  twitter: {
    // 큰 이미지가 포함된 공유 카드 형식을 사용합니다.
    card: "summary_large_image",
    // Twitter 카드의 제목입니다.
    title: "클래스잇",
    // Twitter 카드의 설명 문구입니다.
    description:
      "인터넷 강의 수강, AI 수강생 관리, 결제 및 알림톡 자동화까지 온라인 학원 운영 솔루션 클래스잇",
    // Twitter 카드에 표시될 대표 이미지입니다.
    images: [DEFAULT_TWITTER_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDesignFeedbackVisibleByDefault =
    process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_DESIGN_FEEDBACK_VISIBLE === "1";

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <DesignFeedbackWidget visibleByDefault={isDesignFeedbackVisibleByDefault} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7HYQPRP75Y" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7HYQPRP75Y');
        `}</Script>
      </body>
    </html>
  );
}
