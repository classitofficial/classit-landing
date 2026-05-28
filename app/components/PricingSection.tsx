"use client";

const premiumFeatures = [
  "1:1 전담 매니저 배정",
  "AI와 함께하는 교육 운영",
  "강의별 질의응답 커뮤니티",
  "전용 결제 모듈(나이스페이먼츠)",
  "전용 도메인 연결",
  "출결 & 진도율 관리",
  "강의 영상 다운로드, 캡쳐, 녹화 방지",
  "수강생 유입/전환 데이터",
  "PDF & 영상 파일 저장 용량 제공",
  "카카오 알림톡 발송량 제공"
];

const enterpriseFeatures = [
  "PDF & 영상 파일 저장 용량 무제한",
  "카카오 알림톡 발송량 무제한",
  "실시간 라이브 강의 연동",
  "정기 결제 (구독 결제) 연동",
  "교재 발주 및 배송 지원",
  "맞춤형 디자인",
  "맞춤형 기능",
  "어플리케이션 출시"
];

function CheckIcon() {
  return (
    <img
      src="/images/plan-check-new2.png"
      alt=""
      className="size-4 shrink-0"
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

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex gap-2 items-center">
      <CheckIcon />
      <span className="text-[#e9ecf2] text-[14px] font-medium leading-[21px] tracking-[-0.21px] whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}

function PlanBadge({ name, type }: { name: string; type: string }) {
  return (
    <div className="btn-gradient btn-gradient-black border border-white flex gap-1 items-center justify-center px-3 py-1 rounded-[16px] w-fit">
      <span className="text-[#f8faff] text-[16px] font-bold leading-[24px] tracking-[-0.24px] whitespace-nowrap">
        {name}
      </span>
      <span className="text-white text-[16px] font-medium leading-[24px] tracking-[-0.24px] whitespace-nowrap">
        {type}
      </span>
    </div>
  );
}

function CtaButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      className="btn-gradient btn-gradient-blue border border-white flex gap-1 h-[52px] items-center justify-center px-4 py-2 rounded-[16px] w-full"
    >
      <span className="text-[#f8faff] text-[14px] font-bold leading-[21px] whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

function PlanPriceColumn({
  current,
  discount,
  label,
  original,
  valueClassName,
}: {
  current: string;
  discount?: string;
  label: string;
  original?: string;
  valueClassName: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1 items-start min-w-0">
      <p className="text-[#f8faff] text-[14px] font-medium leading-[21px] tracking-[-0.21px] w-full">
        {label}
      </p>
      <div className="flex flex-col items-start w-full">
        {original && discount && (
          <div className="flex gap-1 items-center w-full">
            <p className="text-[#a9b1c1] text-[12px] font-medium leading-[18px] tracking-[-0.18px] line-through whitespace-nowrap">
              {original}
            </p>
            <p className="text-[#f98585] text-[12px] font-medium leading-[18px] tracking-[-0.18px] whitespace-nowrap">
              {discount}↓
            </p>
          </div>
        )}
        <p className={valueClassName}>
          {current}
        </p>
      </div>
    </div>
  );
}

function DiscountNote() {
  return (
    <p className="text-[#a9b1c1] text-[12px] font-medium leading-[18px] tracking-[-0.18px] w-full">
      * 온라인 신청 전용 할인가입니다.
    </p>
  );
}

function PremiumCard({ mobile }: { mobile?: boolean }) {
  const p = mobile ? "p-5" : "p-5 min-[769px]:p-8";
  const gap = mobile ? "gap-6" : "gap-8";
  const cardHeight = mobile ? "" : "h-full";
  const bodyHeight = mobile ? "" : "flex-1";
  const priceValueClass = mobile
    ? "text-[#f8faff] text-[20px] font-bold leading-[30px] tracking-[-0.3px] whitespace-nowrap"
    : "text-[#f8faff] text-[24px] font-bold leading-[32px] tracking-[-0.36px] whitespace-nowrap";
  const priceRowClass = mobile
    ? "flex gap-4 items-stretch w-full"
    : "flex gap-4 items-start w-full";
  return (
    <div
      className={`flex ${cardHeight} flex-col items-center rounded-[16px] w-full p-1`}
      style={{ background: "linear-gradient(90deg, #3d82f5 0%, #0360ef 100%)" }}
    >
      <div className="flex items-center justify-center py-4 px-1 w-full">
        <span className="text-white text-[16px] font-bold leading-[24px] tracking-[-0.24px] whitespace-nowrap">
          추천 플랜
        </span>
      </div>
      <div
        className={`flex ${bodyHeight} flex-col ${gap} items-start ${p} rounded-[16px] w-full`}
        style={{ background: "linear-gradient(180deg, #262c3a 0%, #0f1219 100%)" }}
      >
        <div className="flex flex-col gap-2 items-start w-full">
          <PlanBadge name="Premium" type="Plan" />
          <div className="flex flex-col gap-4 items-start w-full">
            <p className="text-[#e9ecf2] text-[14px] font-medium leading-[21px] tracking-[-0.21px] w-full">
              AI와 함께 자동으로 운영하는 교육 플랫폼
            </p>
            <div className={priceRowClass}>
              <PlanPriceColumn
                current="550,000원"
                discount="44%"
                label="개설비(최초 1회)"
                original="990,000원"
                valueClassName={priceValueClass}
              />
              <PlanPriceColumn
                current="390,000원"
                discount="11%"
                label="월 관리비"
                original="440,000원"
                valueClassName={priceValueClass}
              />
            </div>
            <div className="flex flex-col gap-2 items-start w-full">
              <CtaButton label="도입 상담 신청하기" />
              <DiscountNote />
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2 items-start">
          {premiumFeatures.map((f) => (
            <FeatureItem key={f} text={f} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EnterpriseCard({ mobile }: { mobile?: boolean }) {
  const p = mobile ? "p-5" : "p-5 min-[769px]:p-8";
  const gap = mobile ? "gap-8" : "gap-8";
  const h = mobile ? "" : "flex-1";
  const priceValueClass = mobile
    ? "text-[#f8faff] text-[20px] font-bold leading-[30px] tracking-[-0.3px] whitespace-nowrap"
    : "text-[#f8faff] text-[24px] font-bold leading-[32px] tracking-[-0.36px] whitespace-nowrap";
  const priceRowClass = mobile
    ? "flex gap-4 items-stretch w-full"
    : "flex gap-4 items-start w-full";
  return (
    <div
      className={`flex flex-col ${gap} ${h} items-start ${p} rounded-[16px] w-full`}
      style={{ background: "linear-gradient(180deg, #262c3a 0%, #0f1219 100%)" }}
    >
      <div className="flex flex-col gap-2 items-start w-full">
        <PlanBadge name="Enterprise" type="Plan" />
        <div className="flex flex-col gap-4 items-start w-full">
          <p className="text-[#e9ecf2] text-[14px] font-normal leading-[1.5] tracking-[-0.28px] w-full">
            맞춤형 관리 시스템으로 운영하는 완성형 교육 플랫폼
          </p>
          <div className={priceRowClass}>
            <PlanPriceColumn
              current="별도 협의"
              label="개설비(최초 1회)"
              valueClassName={priceValueClass}
            />
            <PlanPriceColumn
              current="별도 협의"
              label="월 관리비"
              valueClassName={priceValueClass}
            />
          </div>
          <CtaButton label="컨설팅 문의하기" />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-4 items-start">
        <span className="text-[#f8faff] text-[14px] font-medium leading-[21px] tracking-[-0.21px] whitespace-nowrap">
          Premium Plan의 모든 기능 +
        </span>
        <div className="flex flex-col gap-2 items-start">
          {enterpriseFeatures.map((f) => (
            <FeatureItem key={f} text={f} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full bg-[#0b0e14] py-[104px] sm:py-36">
      {/* 모바일 */}
      <div className="flex sm:hidden flex-col gap-8 items-center px-5">
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h2 className="text-[#f8faff] text-[28px] font-bold leading-[36px] tracking-[-0.42px] w-full">
            운영을 최적화 할 플랜을
            <br />
            선택해보세요
          </h2>
          <p className="text-[#f8faff] text-[14px] font-medium leading-[21px] tracking-[-0.21px] w-full">
            가장 쉽고 편리한 교육 환경,
            <br />
            지금 우리 수강생들에게 맞는 최적의 플랜을 선택해보세요.
          </p>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <PremiumCard mobile />
          <EnterpriseCard mobile />
        </div>
      </div>

      {/* 데스크탑 */}
      <div className="hidden sm:flex flex-col gap-[52px] items-center w-full">
        <div className="flex flex-col gap-2 items-center text-center w-[468px]">
          <h2 className="text-[#f8faff] text-[28px] font-bold leading-[36px] tracking-[-0.42px] w-full">
            운영을 최적화 할 플랜을 선택해보세요
          </h2>
          <p className="text-[#f8faff] text-[14px] font-medium leading-[21px] tracking-[-0.21px] w-full">
            가장 쉽고 편리한 교육 환경, 지금 우리 수강생들에게 맞는 최적의
            플랜을 선택해보세요.
          </p>
        </div>
        <div className="flex gap-5 items-stretch justify-center w-full px-10">
          <div className="flex max-w-[440px] w-full min-w-0">
            <PremiumCard />
          </div>
          <div className="flex flex-col max-w-[440px] w-full min-w-0">
            <div aria-hidden="true" className="h-[60px] shrink-0" />
            <EnterpriseCard />
            <div aria-hidden="true" className="h-1 shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
