"use client";

import { useEffect, useRef, useState } from "react";

function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const features = [
  {
    badge: "1",
    title: ["플랫폼 내", "전자책, VOD 교육 운영"],
    description: [
      "업로드된 교육 자료는 다운로드 없이 플랫폼 내에서",
      "바로 열람할 수 있으며, 캡처 및 녹화 방지 기술을 적용해",
      "콘텐츠 유출을 완벽하게 차단합니다.",
    ],
    pcImg: "slide_1.png",
  },
  {
    badge: "2",
    title: ["결제 알림도", "학습 리포트도 자동으로"],
    description: [
      "결제 완료 알림, 학습 리포트 등",
      "필요한 내용은 모두 카카오 알림톡으로 자동 발송됩니다.",
    ],
    pcImg: "new_slide_2.png",
  },
  {
    badge: "3",
    title: ["AI와 함께하는", "수강생 관리"],
    description: [
      "수강생의 몰입은 24시간 멈춤 없이,",
      "선생님의 부담은 절반으로 줄일 수 있습니다.",
      "AI가 완성하는 스마트한 질의응답 시스템을 경험해 보세요.",
    ],
    pcImg: "new_slide_3.png",
  },
  {
    badge: "4",
    title: ["최저 수수료로 받는", "간편하고 안전한 결제"],
    description: [
      "카드결제, 간편결제, 정기결제, 가상계좌 등",
      "일반 PG사 계약보다 최대 0.5% 낮은 수수료로",
      "결제 모듈을 제공합니다.",
    ],
    pcImg: "slide_4.png",
  },
];

function FeatureBadge({ number }: { number: string }) {
  return (
    <img
      src={`/images/number_${number}.png`}
      width={28}
      height={28}
      alt={`기능 ${number}`}
      className="block size-7"
    />
  );
}

function MobileFeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div
      ref={ref}
      className="flex flex-col gap-5 items-center transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(2rem)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="w-full max-w-[600px] mx-auto overflow-hidden">
        <img
          src={`/images/${feature.pcImg}`}
          alt={feature.title.join(" ")}
          className="w-full h-auto block"
        />
      </div>
      <div className="flex flex-col gap-2 w-full max-w-[600px]">
        <div className="flex flex-col gap-2">
          <FeatureBadge number={feature.badge} />
          <h3 className="text-[#fefefe] text-[20px] font-bold leading-[30px] tracking-[-0.3px]">
            {feature.title.map((line, i) => (
              <span key={i}>
                {line}
                {i < feature.title.length - 1 && <br />}
              </span>
            ))}
          </h3>
        </div>
        <p className="text-[#fefefe] text-[14px] font-medium leading-[21px] tracking-[-0.21px]">
          {feature.description.map((line, i) => (
            <span key={i}>
              {line}
              {i < feature.description.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function DesktopFeatureCard({ feature }: { feature: typeof features[0] }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div
      ref={ref}
      className="flex gap-10 items-center justify-start w-full transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(2.5rem)",
      }}
    >
      {/* PC 이미지 카드 */}
      <div className="relative flex-[540] min-w-0 max-w-[540px]">
        {feature.pcImg.endsWith(".gif") ? (
          <div className="w-full aspect-[540/600] border-[8px] border-black overflow-hidden bg-white relative">
            <img
              src={`/images/${feature.pcImg}`}
              alt={feature.title.join(" ")}
              className="absolute max-w-none"
              style={{ left: "9.45%", top: "-0.69%", width: "81.1%", height: "102.19%" }}
            />
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            {feature.pcImg && (
              <img
                src={`/images/${feature.pcImg}`}
                alt={feature.title.join(" ")}
                className="w-full h-auto block"
              />
            )}
          </div>
        )}
        {feature.pcImg.endsWith(".gif") && (
          <div className="absolute inset-0 border-2 border-[#a9b6c2] pointer-events-none" />
        )}
      </div>

      {/* Feature description */}
      <div className="flex-[370] min-w-0 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <FeatureBadge number={feature.badge} />
          <h3 className="text-[#fefefe] text-[28px] font-bold leading-[36px] tracking-[-0.42px]">
            {feature.title.map((line, i) => (
              <span key={i}>
                {line}
                {i < feature.title.length - 1 && <br />}
              </span>
            ))}
          </h3>
        </div>
        <p className="text-[#fefefe] text-[16px] font-medium leading-[24px] tracking-[-0.24px]">
          {feature.description.map((line, i) => (
            <span key={i}>
              {line}
              {i < feature.description.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="w-full">
      <div className="min-[1080px]:hidden flex flex-col gap-8 px-5 py-[104px]">
        <h2 className="text-[#fefefe] text-[28px] font-bold leading-[36px] tracking-[-0.42px] text-center w-full">
          가장 쉽고<br />편리한 교육 환경
        </h2>
        <div className="flex flex-col gap-[52px]">
          {features.map((feature, index) => (
            <MobileFeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className="hidden min-[1080px]:block py-36">
        <div className="max-w-[1440px] mx-auto px-10">
          <div className="flex gap-10 items-start">
            {/* Left sticky heading */}
            <div className="sticky top-[224px] min-w-[370px] max-w-[370px]">
              <h2 className="text-[#fefefe] text-[48px] font-black leading-[72px] tracking-[-1.2px]">
                가장 쉽고
                <br />
                편리한 교육 환경
              </h2>
            </div>

            {/* Right scrollable feature rows */}
            <div className="flex flex-col gap-[52px] flex-1 min-w-0">
              {features.map((feature, index) => (
                <DesktopFeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
