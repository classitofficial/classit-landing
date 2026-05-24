const imgTossIcon = "/images/nicepayment.png";

function Divider({ highlight }: { highlight?: boolean }) {
  return (
    <div className="w-full h-px my-2" style={{
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

type FeeRow = {
  label: string;
  normal: string;
  affiliate: string;
  savings: string;
};


const feeRows: FeeRow[] = [
  { label: "가입비",   normal: "220,000원", affiliate: "면제",  savings: "100%" },
  { label: "연회비",   normal: "110,000원", affiliate: "면제",  savings: "100%" },
  { label: "정산주기",   normal: "5일", affiliate: "3일",  savings: "2일" },
  
  { label: "카드결제", normal: "3.4%",      affiliate: "2.9%",  savings: "0.5%" },
  { label: "간편결제", normal: "3.4%",      affiliate: "2.9%",  savings: "0.5%" },
];

function ArrowDown() {
  return (
    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 6.5L0.535898 0.75L7.4641 0.75L4 6.5Z" fill="#3D82F5" />
    </svg>
  );
}


function FeeTable({ rows, mobile }: { rows: FeeRow[]; mobile?: boolean }) {
  const textSize = mobile ? "text-[12px] leading-[18px]" : "text-[14px] leading-[21px]";
  const cellH = mobile ? "h-[52px]" : "h-[52px]";

  return (
    <div className={`flex flex-col gap-5 ${mobile ? "w-full" : "w-[900px]"}`}>
      {/* 헤더 행 */}
      <div className={`bg-[#0f1219] flex items-center rounded-[16px] h-[64px]`}>
        <div className="flex h-full items-center justify-center flex-1">
          <span className={`text-[#F8FAFF] font-bold whitespace-nowrap tracking-[0.18px] ${textSize}`}>
            항목
          </span>
        </div>
        <ColDivider />
        <div className="flex h-full items-center justify-center flex-1">
          <span className={`text-[#F8FAFF] font-bold whitespace-nowrap tracking-[0.18px] ${textSize}`}>
            타사계약
          </span>
        </div>
        <ColDivider />
        <div className="flex h-full items-center justify-center flex-1 rounded-r-[16px]">
          <span className={`text-[#f8faff] font-bold whitespace-nowrap tracking-[0.18px] ${textSize}`}>
            제휴계약
          </span>
        </div>
      </div>

      {/* 데이터 행 */}
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <>
            <div className="flex items-center w-full">
              <div className={`flex ${cellH} items-center justify-center flex-1`}>
                <span className={`text-[#F8FAFF] font-medium whitespace-nowrap tracking-[-0.18px] ${textSize}`}>
                  {row.label}
                </span>
              </div>
              <div className={`flex ${cellH} items-center justify-center flex-1`}>
                <span className={`text-[#F8FAFF] font-medium whitespace-nowrap tracking-[-0.18px] ${textSize}`}>
                  {row.normal}
                </span>
              </div>
              <div className={`flex gap-1 ${cellH} items-center justify-center flex-1`}>
                <span className={`text-[#f8faff] font-bold whitespace-nowrap tracking-[0.18px] ${textSize}`}>
                  {row.affiliate}
                </span>
                <div className="flex items-center">
                  <span className={`text-[#3d82f5] font-medium tracking-[-0.18px] ${textSize}`}>(</span>
                  <span className={`text-[#3d82f5] font-medium tracking-[-0.18px] ${textSize}`}>{row.savings}</span>
                  <ArrowDown />
                  <span className={`text-[#3d82f5] font-medium tracking-[-0.18px] ${textSize}`}>)</span>
                </div>
              </div>
            </div>
            {i < rows.length - 1 && <Divider/>}
          </>
        ))}
      </div>
    </div>
  );
}

export default function TossPaymentsFeeSection() {
  return (
    <section className="w-full bg-[#0b0e14] py-[104px] md:py-36">
      {/* 모바일 */}
      <div className="flex md:hidden flex-col gap-8 items-center px-5">
        {/* 로고 + 텍스트 */}
        <div className="flex flex-col gap-5 items-center">
          <div className="h-[52px] flex items-center gap-3">
          <div className="h-[54px] w-[200px] overflow-hidden">
              <img src={imgTossIcon} alt=""  />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center text-center">
            <div className="text-[#f8faff] text-[28px] font-bold leading-[36px] tracking-[-0.42px]">
              <p>클래스잇은</p>
              <p>나이스페이먼츠 공식 제휴사입니다</p>
            </div>
            <p className="text-[#f8faff] text-[14px] font-medium leading-[21px] tracking-[-0.21px]">
              * 영중소(매출) 구간에 따라 수수료가 더 낮아질 수 있습니다.
            </p>
          </div>
        </div>
        <FeeTable rows={feeRows} mobile />
      </div>

      {/* 데스크탑 */}
      <div className="hidden md:flex max-w-[1440px] mx-auto px-10 items-center justify-between">
        <div className="flex flex-col gap-5 shrink-0">
          <div className="h-[52px] flex items-center gap-3">
            <div className="h-[54px] w-[200px] overflow-hidden">
              <img src={imgTossIcon} alt=""  />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[#f8faff] text-[28px] font-bold leading-[36px] tracking-[-0.42px]">
              <p>클래스잇은</p>
              <p>나이스페이먼츠 공식 제휴사입니다</p>
            </div>
            <p className="text-[#f8faff] text-[14px] font-medium leading-[21px] tracking-[-0.21px]">
              * 영중소(매출) 구간에 따라 수수료가 더 낮아질 수 있습니다.
            </p>
          </div>
        </div>
        <FeeTable rows={feeRows} />
      </div>
    </section>
  );
}
