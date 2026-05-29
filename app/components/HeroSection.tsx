"use client";

const imgBgGlow = "/images/hero-bg-glow.png";
const imgDashboard = "/images/hero-pc.png";
const imgDashboardMobile = "/images/banner-mob.png";
const imgMessageIcon = "/icons/message.svg";
const imgEdit = "/images/edit-01.png";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b0e14] flex flex-col min-h-[100svh] sm:h-[100svh]">
      {/* 배경 글로우 */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          src={imgBgGlow}
          className="absolute w-full h-full object-cover opacity-60"
        />
      </div>

      {/* 콘텐츠 영역 (텍스트 + 버튼) */}
      <div className="relative z-10 flex flex-col items-center pt-[171px] sm:pt-[216px] px-5 sm:px-10 shrink-0">
        <div className="flex flex-col items-center gap-[52px] sm:gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="btn-gradient btn-gradient-black bg-[rgba(255,255,255,0.1)] border border-white flex items-center justify-center gap-1 h-10 px-4 rounded-[32px]">
              <p className="text-[#f8faff] text-[14px] font-bold leading-[21px] whitespace-nowrap">
                바로 운영할 수 있는 온라인 학원
              </p>
            </div>

            <div className="text-center">
              <h1 className="text-[#f8faff] font-black tracking-[-0.8px] sm:tracking-[-1.2px] text-[32px] leading-[48px] sm:text-[48px] sm:leading-[72px] sm:whitespace-nowrap">
                <span className="hidden sm:block">
                  하나의 플랫폼에서<br/>효율적인 교육 운영을 시작하세요
                </span>
                <span className="block sm:hidden">
                  하나의 플랫폼에서<br/>효율적인 교육 운영을<br/>시작하세요
                </span>
              </h1>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-gradient btn-gradient-blue flex items-center gap-1 h-[52px] px-6 rounded-[32px] border border-white hover:opacity-90 transition-opacity w-[172px]"
            >
              <img alt="" src={imgEdit} className="size-4" />
              <span className="text-[#f8faff] text-[14px] font-bold leading-[21px] whitespace-nowrap">
                도입 상담 신청하기
              </span>
            </button>

            <button
              onClick={() => window.open("https://pf.kakao.com/_XEjbX", "_blank", "noopener,noreferrer")}
              className="btn-gradient btn-gradient-yellow flex items-center gap-1 h-[52px] px-6 rounded-[32px] border border-white hover:opacity-90 transition-opacity w-[172px]"
            >
              <img alt="" src={imgMessageIcon} className="size-4" />
              <span className="text-[#3b1d1d] text-[14px] font-bold leading-[21px] whitespace-nowrap">
                카톡 간편 문의하기
              </span>
            </button>
          </div>

          {/* 대시보드 이미지 - 모바일 */}
          <div className="sm:hidden w-full mb-[52px] mx-auto">
            <img
              alt="Classit 플랫폼 대시보드"
              src={imgDashboardMobile}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>

      {/* 버튼-이미지 최소 간격 보장 (82px) */}
      <div className="hidden sm:block relative z-10 shrink-0 min-h-[72px] max-h-[72px] flex-1" />

      {/* 대시보드 이미지 - 데스크톱 (흐름에 포함, overflow-hidden으로 크롭) */}
      <div className="hidden sm:block relative z-10 shrink-0 w-full max-w-[1040px] mx-auto rounded-tl-[48px] rounded-tr-[48px] overflow-hidden px-10">
        <img
          alt="Classit 플랫폼 대시보드"
          src={imgDashboard}
          className="w-full h-auto block"
        />
      </div>
    </section>
  );
}
