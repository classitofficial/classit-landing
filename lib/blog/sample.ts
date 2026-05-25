import type { BlogPost } from "@/lib/blog/types";

function samplePost(input: Omit<BlogPost, "thumbnail_url" | "thumbnail_path" | "status" | "author_name" | "updated_at">): BlogPost {
  return {
    ...input,
    thumbnail_url: null,
    thumbnail_path: null,
    status: "published",
    author_name: "Classit",
    updated_at: input.created_at,
  };
}

export const sampleBlogPosts: BlogPost[] = [
  samplePost({
    id: "sample-1",
    title: "온라인 클래스 운영을 효율화하는 첫 번째 체크리스트",
    slug: "online-class-operations-checklist",
    summary: "수강생 관리, 결제, 알림, 콘텐츠 보호를 한 흐름으로 정리하는 방법을 소개합니다.",
    content:
      "클래스 운영은 강의 콘텐츠만으로 완성되지 않습니다.\n\n수강생이 어떤 강의를 듣고 있는지, 결제가 정상적으로 완료되었는지, 필요한 알림이 제때 발송되는지까지 하나의 흐름으로 관리되어야 합니다.\n\nClassit은 운영자가 반복 업무를 줄이고 교육 콘텐츠에 집중할 수 있도록 VOD 수강, 결제, 알림, 수강생 관리를 한 화면에서 다룰 수 있게 설계되었습니다.",
    published_at: "2026-05-24T00:00:00.000Z",
    seo_title: "온라인 클래스 운영 체크리스트",
    seo_description: "온라인 클래스 운영자가 먼저 점검해야 할 운영 자동화 항목을 정리합니다.",
    created_at: "2026-05-24T00:00:00.000Z",
  }),
  samplePost({
    id: "sample-2",
    title: "VOD 강의 판매 전에 확인해야 할 콘텐츠 보호 기준",
    slug: "vod-content-protection",
    summary: "다운로드 제한, 캡처 방지, 수강 권한 관리처럼 VOD 운영 전 필요한 기준을 살펴봅니다.",
    content:
      "VOD 강의는 한 번 유출되면 회수가 어렵습니다.\n\n따라서 판매 전에 수강 권한, 다운로드 제한, 캡처 및 녹화 방지 정책을 먼저 정리해야 합니다.\n\n기술적 보호와 운영 정책을 함께 설계하면 강의 품질과 브랜드 신뢰도를 함께 지킬 수 있습니다.",
    published_at: "2026-05-21T00:00:00.000Z",
    seo_title: null,
    seo_description: null,
    created_at: "2026-05-21T00:00:00.000Z",
  }),
  samplePost({
    id: "sample-3",
    title: "결제 알림 자동화가 학원 운영에 주는 변화",
    slug: "payment-notification-automation",
    summary: "결제 완료, 수강 안내, 리포트 발송을 자동화하면 운영자가 줄일 수 있는 일을 정리합니다.",
    content:
      "결제와 알림은 단순 반복 업무처럼 보이지만, 누락되면 바로 고객 응대 비용으로 돌아옵니다.\n\n자동화된 알림 흐름은 결제 완료 후 수강 안내, 학습 리포트, 운영 공지를 안정적으로 전달합니다.",
    published_at: "2026-05-18T00:00:00.000Z",
    seo_title: null,
    seo_description: null,
    created_at: "2026-05-18T00:00:00.000Z",
  }),
  samplePost({
    id: "sample-4",
    title: "수강생 진도율을 운영 지표로 활용하는 방법",
    slug: "student-progress-metrics",
    summary: "진도율, 완강률, 재수강 요청을 보고 강의 운영 품질을 점검하는 기본 지표를 소개합니다.",
    content:
      "온라인 강의 운영에서 진도율은 단순한 숫자가 아닙니다.\n\n수강생이 어디에서 멈추는지, 어떤 강의에서 완강률이 떨어지는지 확인하면 콘텐츠 구성과 안내 흐름을 개선할 수 있습니다.\n\nClassit에서는 수강 데이터와 운영 알림을 함께 보면서 반복 문의를 줄이고 강의 품질을 점검할 수 있습니다.",
    published_at: "2026-05-15T00:00:00.000Z",
    seo_title: null,
    seo_description: null,
    created_at: "2026-05-15T00:00:00.000Z",
  }),
  samplePost({
    id: "sample-5",
    title: "온라인 학원 결제 페이지를 만들 때 놓치기 쉬운 것들",
    slug: "online-academy-payment-page",
    summary: "상품 구성, 환불 안내, 결제 후 수강 권한 부여까지 결제 페이지에서 확인할 요소를 정리합니다.",
    content:
      "결제 페이지는 단순히 금액을 받는 화면이 아니라 수강 경험의 시작점입니다.\n\n상품 구성, 할인 정책, 환불 안내, 결제 후 수강 권한 부여 방식이 명확해야 상담 문의와 운영 리스크를 줄일 수 있습니다.\n\n운영자는 결제 이후 자동으로 안내가 이어지는지까지 함께 확인해야 합니다.",
    published_at: "2026-05-12T00:00:00.000Z",
    seo_title: null,
    seo_description: null,
    created_at: "2026-05-12T00:00:00.000Z",
  }),
  samplePost({
    id: "sample-6",
    title: "알림톡으로 줄일 수 있는 반복 운영 업무",
    slug: "alimtalk-operation-automation",
    summary: "결제 완료, 수강 시작, 미수강 안내, 공지 발송을 자동화하는 운영 시나리오를 살펴봅니다.",
    content:
      "반복 안내는 운영자가 직접 처리할수록 누락 가능성이 커집니다.\n\n알림톡 자동화는 결제 완료, 수강 시작, 미수강 안내, 공지 발송처럼 반복되는 접점을 안정적으로 처리합니다.\n\n중요한 것은 메시지를 많이 보내는 것이 아니라 필요한 순간에 정확한 메시지가 도착하게 만드는 것입니다.",
    published_at: "2026-05-09T00:00:00.000Z",
    seo_title: null,
    seo_description: null,
    created_at: "2026-05-09T00:00:00.000Z",
  }),
  samplePost({
    id: "sample-7",
    title: "강의 상품을 패키지로 구성할 때의 운영 기준",
    slug: "course-package-management",
    summary: "단일 강의와 패키지 상품을 함께 운영할 때 필요한 권한, 기간, 가격 기준을 정리합니다.",
    content:
      "패키지 상품은 객단가를 높일 수 있지만 운영 기준이 흐리면 문의가 늘어납니다.\n\n각 강의의 수강 기간, 제공 자료, 환불 기준, 추가 혜택을 명확히 구분해야 합니다.\n\n상품별 권한과 수강 기간을 빠르게 확인할 수 있어야 운영 실수가 줄어듭니다.",
    published_at: "2026-05-06T00:00:00.000Z",
    seo_title: null,
    seo_description: null,
    created_at: "2026-05-06T00:00:00.000Z",
  }),
  samplePost({
    id: "sample-8",
    title: "운영자가 먼저 보는 핵심 지표 구성",
    slug: "operation-dashboard-first-view",
    summary: "매출, 신규 수강생, 미수강자, 문의 현황처럼 첫 화면에 필요한 정보를 정리합니다.",
    content:
      "운영 대시보드는 모든 정보를 한 번에 보여주는 화면이 아닙니다.\n\n운영자가 매일 확인해야 하는 매출, 신규 수강생, 미수강자, 문의 현황을 우선 배치해야 합니다.\n\n자주 보는 지표가 첫 화면에 있으면 운영자는 문제를 더 빨리 발견하고 대응할 수 있습니다.",
    published_at: "2026-05-03T00:00:00.000Z",
    seo_title: null,
    seo_description: null,
    created_at: "2026-05-03T00:00:00.000Z",
  }),
];
