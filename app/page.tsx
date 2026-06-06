import Index from "@/app/components/page/Index";
import { SITE_URL } from "@/app/shared-metadata";

const classitJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "클래스잇",
      "alternateName": ["classit", "클래스잇 온라인 강의 플랫폼", "classit LMS"],
      "url": SITE_URL,
      "logo": `${SITE_URL}/images/favicon.png`,
      "description": "월 390,000원부터 시작하는 입시 학원 및 교육 기관을 위한 온라인 강의 플랫폼 솔루션",
      "slogan": "하나의 플랫폼에서 시작하는 효율적인 교육 운영",
      "founder": {
        "@type": "Person",
        "name": "이동규",
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "고양시 덕양구",
        "addressRegion": "경기도",
        "addressCountry": "KR",
      },
      "areaServed": {
        "@type": "Country",
        "name": "대한민국",
        "sameAs": "https://www.wikidata.org/wiki/Q884",
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00",
        },
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "url": "https://pf.kakao.com/_XEjbX",
        "contactType": "customer service",
        "availableLanguage": "Korean",
      },
      "knowsAbout": [
        "인터넷 강의 플랫폼",
        "온라인 학원",
        "온라인 클래스",
        "학원 홈페이지",
        "LMS",
        "수강생 관리",
        "학원 출결 관리",
        "학원 결제",
        "학원 AI",
        "화면 녹화 방지",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "name": "클래스잇",
      "alternateName": ["classit", "클래스잇 LMS"],
      "url": SITE_URL,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "description": "월 390,000원부터 시작하는 입시 학원 및 교육 기관을 위한 온라인 강의 플랫폼 SaaS",
      "offers": {
        "@type": "Offer",
        "price": "390000",
        "priceCurrency": "KRW",
        "description": "월 390,000원부터 시작하는 온라인 강의 플랫폼 이용 요금",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "온라인 강의 플랫폼 구축 및 학원 운영 솔루션",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "온라인 강의 사이트 구축",
              "alternateName": ["온라인 강의 플랫폼", "인강 사이트 제작", "학원 홈페이지 제작", "온라인 학원 개설"],
              "description": "별도 개발 없이 학원 브랜드의 온라인 강의 사이트 즉시 개설. VOD 강의 운영, 수강생 관리, 결제 원스톱 제공",
              "serviceType": "온라인 강의 플랫폼 SaaS",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "수강생 관리 자동화",
              "alternateName": ["LMS 수강생 관리", "진도율 관리", "출결 관리", "학습 리포트"],
              "description": "수강생별 진도율, 완강률, 출결 현황 자동 추적 및 학습 리포트 자동 발송",
              "serviceType": "학원 운영 자동화",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "VOD 강의 보안 및 영상 스트리밍",
              "alternateName": ["영상 보안", "캡처 방지", "녹화 방지", "인강 보안"],
              "description": "접근 제어, 워터마크, 캡처 방지 등 강의 콘텐츠 보호 기능 및 CDN 기반 영상 스트리밍",
              "serviceType": "영상 보안 스트리밍",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "온라인 강의 결제 시스템",
              "alternateName": ["학원 결제 시스템", "수강료 결제", "인강 결제"],
              "description": "나이스페이먼츠 공식 제휴. 카드 수수료 2.9%, 별도 PG사 계약 없이 플랫폼 내 결제 처리",
              "serviceType": "교육 결제 솔루션",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "카카오 알림톡 자동 발송",
              "alternateName": ["학원 알림톡", "수강생 알림 자동화", "결제 알림"],
              "description": "결제 완료, 질문 답변 등록, 과제 피드백, 학습 리포트 등 주요 이벤트 알림톡 자동 발송",
              "serviceType": "학원 알림 자동화",
            },
          },
        ],
      },
    },
  ],
} as const;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(classitJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Index />
    </>
  );
}
