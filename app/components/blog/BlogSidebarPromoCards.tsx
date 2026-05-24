const backgroundImage = "/images/gray-fluid-paint-running-black-background-abstract-image-texture-pattern-background-wallpaper.png";

const promoCards = [
  // {
  //   eyebrow: "1인 IT 창업을 준비 중이라면?",
  //   title: ["노코드 부트 캠프", "사전 신청하기"],
  //   image: "/images/clock.png",
  //   cta: "사전 신청하기",
  //   href: null,
  // },
  {
    eyebrow: "노코드가 처음이신가요?",
    title: ["nocoders", "뉴비 할인 쿠폰 지급"],
    image: "/images/coupon.png",
    cta: "쿠폰 지급받기",
    href: "https://tally.so/r/mZW6ba",
  },
  // {
  //   eyebrow: "(주)노코더스 채용",
  //   title: ["버블 개발자", "주니어/인턴 모집 중"],
  //   image: "/images/bubble_icon2.png",
  //   cta: "지원하기",
  //   href: "https://time-shrine-949.notion.site/Welcome-to-NOCODERS-1620f1f571ca807d9e18ef6930258a7c",
  // },
];

function ArrowRightSmall() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M5.83325 10H14.1666M10.8333 5.83334L14.9999 10L10.8333 14.1667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PromoCard({ card }: { card: (typeof promoCards)[number] }) {
  return (
    <div className="relative h-[408px] w-[330px] overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="absolute inset-0 flex h-[408px] w-[330px] items-center justify-center">
        <div className="-scale-y-100 rotate-180">
          <div className="relative h-[408px] w-[330px] overflow-hidden rounded-2xl bg-black">
            <img
              src={backgroundImage}
              alt=""
              className="absolute h-full max-w-none object-cover"
            />
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-8 flex w-[330px] flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <p className="w-full text-[16px] font-bold leading-6 text-[#dbdbdb]">{card.eyebrow}</p>
            <div className="w-full font-aggro text-[24px] font-medium leading-8 text-white">
              {card.title.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="relative size-[164px] shrink-0">
            <img src={card.image} alt="" className="size-full object-contain" />
          </div>
        </div>

        <a
          href={card.href || undefined}
          target={card.href ? "_blank" : undefined}
          rel={card.href ? "noreferrer" : undefined}
          aria-disabled={!card.href}
          className="btn-gradient btn-gradient-blue flex h-12 items-center justify-center gap-1 rounded-3xl border border-white px-4 py-3 text-[14px] font-bold leading-[21px] tracking-[-0.35px] text-white"
        >
          {card.cta}
          <ArrowRightSmall />
        </a>
      </div>
    </div>
  );
}

export default function BlogSidebarPromoCards() {
  return (
    <aside className="hidden self-start lg:block">
      <div className="sticky top-[132px] flex max-h-[calc(100svh-156px)] flex-col gap-5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {promoCards.map((card) => (
          <PromoCard key={card.eyebrow} card={card} />
        ))}
      </div>
    </aside>
  );
}
