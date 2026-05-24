"use client";

import { Fragment } from "react";

function CheckIcon() {
  return (
    <img
      src="/images/plan-check-new24x.png"
      alt=""
      className="size-6 shrink-0"
      aria-hidden="true"
    />
  );
}

function Divider({ highlight }: { highlight?: boolean }) {
  return (
    <div className="w-full h-px" style={{
      background: "linear-gradient(90deg, rgba(94,103,122,0) 0%, rgba(94,103,122,0.4) 49.52%, rgba(94,103,122,0) 100%)"}} 
    />
  );
}

function ColDivider() {
  return (
    <div className="w-px h-8 shrink-0" style={{
      background: "linear-gradient(180deg, rgba(94,103,122,0) 0%, #5E677A 49.52%, rgba(94,103,122,0) 100%)"
    }} />
  );
}

type CellValue = "check" | "dash" | string;

interface Row {
  feature: string;
  premium: CellValue;
  enterprise: CellValue;
  isSubtext?: boolean;
}

const rows: Row[] = [
  { feature: "카드 수수료", premium: "2.9%", enterprise: "2.9%" },
  {
    feature: "PDF & 영상 파일 트래픽",
    premium: "무제한 무료",
    enterprise: "무제한 무료",
    isSubtext: true,
  },
  {
    feature: "PDF & 영상 파일 저장 용량",
    premium: "저장 용량 500GB 무료",
    enterprise: "무제한 무료",
    isSubtext: true,
  },
  {
    feature: "수강 인원",
    premium: "활성 인원 200명 무료",
    enterprise: "무제한 무료",
    isSubtext: true,
  },
  {
    feature: "카카오 알림톡 발송",
    premium: "월 발송 400건 무료",
    enterprise: "무제한 무료",
    isSubtext: true,
  },
  { feature: "영상 화질", premium: "FHD (1080p)", enterprise: "FHD (1080p)" },
  { feature: "강의 영상 다운로드, 캡쳐, 녹화 방지", premium: "check", enterprise: "check" },
  { feature: "1:1 전담 매니저 배정", premium: "check", enterprise: "check" },
  { feature: "전용 도메인 연결", premium: "check", enterprise: "check" },
  { feature: "전용 결제 모듈", premium: "check", enterprise: "check" },
  { feature: "교육운영 AI", premium: "check", enterprise: "check" },
  { feature: "출결 & 진도율 관리", premium: "check", enterprise: "check" },
  { feature: "수강생 유입/전환 데이터", premium: "check", enterprise: "check" },
  { feature: "실시간 라이브 강의 연동", premium: "dash", enterprise: "check" },
  { feature: "정기 결제 (구독 결제) 연동", premium: "dash", enterprise: "check" },
  { feature: "교재 발주 및 배송 지원", premium: "dash", enterprise: "check" },
  { feature: "맞춤형 디자인", premium: "dash", enterprise: "check" },
  { feature: "맞춤형 기능", premium: "dash", enterprise: "check" },
  { feature: "어플리케이션 출시", premium: "dash", enterprise: "check" },
];

function Cell({ value, isSubtext, mobile }: { value: CellValue; isSubtext?: boolean; mobile?: boolean }) {
  const textSm = mobile ? "text-[12px] leading-[18px] tracking-[-0.18px]" : "text-[14px] leading-[21px] tracking-[-0.21px]";
  if (value === "check") return <CheckIcon />;

  if (value === "dash") {
    return <span className={`text-[#f8faff] font-medium ${textSm}`}>-</span>;
  }

  if (isSubtext && value.includes("\n")) {
    const [main, sub] = value.split("\n");
    return (
      <div className="text-center">
        <p className={`text-[#f8faff] font-medium ${textSm}`}>{main}</p>
        {!mobile && <p className="text-[#f8faff] font-medium text-[12px] leading-[18px] tracking-[-0.18px]">{sub}</p>}
      </div>
    );
  }

  return (
    <span className={`text-[#f8faff] font-medium ${textSm} text-center`}>
      {value}
    </span>
  );
}

const HIGHLIGHT_DIVIDER_BEFORE = 4;

export default function PlanComparisonSection() {
  return (
    <section className="flex flex-col gap-8 min-[768px]:gap-[52px] items-center py-[104px] min-[768px]:py-[144px]">
      <h2 className="text-[#f8faff] text-[28px] font-bold leading-9 tracking-[-0.42px] text-center">
        플랜 비교
      </h2>

      {/* 모바일: 768px 미만에서 노출 */}
      <div className="flex min-[768px]:hidden flex-col w-full px-5">
        <div className="bg-[#0f1219] flex h-[64px] items-center rounded-[16px] mb-5">
          <div className="flex flex-1 h-full items-center justify-center px-3">
            <span className="text-white text-[12px] font-bold leading-[18px] tracking-[0.18px] whitespace-nowrap">핵심 기능</span>
          </div>
          <ColDivider />
          <div className="flex flex-1 h-full items-center justify-center">
            <span className="text-white text-[12px] font-bold leading-[18px] tracking-[0.18px] whitespace-nowrap">Premium</span>
          </div>
          <ColDivider />
          <div className="flex flex-1 h-full items-center justify-center">
            <span className="text-white text-[12px] font-bold leading-[18px] tracking-[0.18px] whitespace-nowrap">Enterprise</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {rows.map((row, i) => (
            <Fragment key={`mob-${i}`}>
              {i === HIGHLIGHT_DIVIDER_BEFORE && <Divider highlight />}
              <div className="flex items-center w-full">
                <div className="flex flex-1 min-h-[52px] items-center justify-center px-3" style={{ maxWidth: "33.333%" }}>
                  <span className="text-[#f8faff] text-[11px] font-medium leading-[16px] tracking-[-0.18px] text-center">
                    {row.feature}
                  </span>
                </div>
                <div className="flex flex-1 min-h-[52px] items-center justify-center px-1" style={{ maxWidth: "33.333%" }}>
                  <Cell value={row.premium} isSubtext={row.isSubtext} mobile />
                </div>
                <div className="flex flex-1 min-h-[52px] items-center justify-center px-1" style={{ maxWidth: "33.333%" }}>
                  <Cell value={row.enterprise} isSubtext={row.isSubtext} mobile />
                </div>
              </div>
              {i < rows.length - 1 && i !== HIGHLIGHT_DIVIDER_BEFORE - 1 && <Divider />}
            </Fragment>
          ))}
        </div>
      </div>

      {/* 데스크탑: 768px 이상에서 노출 */}
      <div className="hidden min-[768px]:block w-full max-w-[1360px] px-10">
        <div className="bg-[#0f1219] flex h-[64px] items-center rounded-2xl mb-5">
          <div className="flex flex-1 h-full items-center justify-center px-8">
            <span className="text-white text-[14px] font-bold leading-[21px]">핵심 기능</span>
          </div>
          <ColDivider />
          <div className="flex flex-1 flex-col h-full items-center justify-center px-8">
            <span className="text-white text-[14px] font-bold leading-6 tracking-[-0.24px] whitespace-nowrap">
              Premium Plan
            </span>
          </div>
          <ColDivider />
          <div className="flex flex-1 flex-col h-full items-center justify-center px-8">
            <span className="text-white text-[14px] font-bold leading-6 tracking-[-0.24px] whitespace-nowrap">
              Enterprise Plan
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {rows.map((row, i) => (
            <Fragment key={`pc-${i}`}>
              {i === HIGHLIGHT_DIVIDER_BEFORE && <Divider highlight />}
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-1 h-[52px] items-center justify-center px-8">
                  <span className="text-[#f8faff] text-[14px] font-medium leading-[21px] tracking-[-0.21px] whitespace-nowrap">
                    {row.feature}
                  </span>
                </div>
                <div className="flex flex-1 h-[52px] items-center justify-center px-8">
                  <Cell value={row.premium} isSubtext={row.isSubtext} />
                </div>
                <div className="flex flex-1 h-[52px] items-center justify-center px-8">
                  <Cell value={row.enterprise} isSubtext={row.isSubtext} />
                </div>
              </div>
              {i < rows.length - 1 && i !== HIGHLIGHT_DIVIDER_BEFORE - 1 && <Divider />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
