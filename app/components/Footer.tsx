function NiceBadge() {
  return (
    <div className="flex items-center gap-1 h-10 px-4 bg-[#0f1219] border border-[#1b1f2a] rounded-[24px] shrink-0 w-fit">
      <div className="size-5 overflow-hidden relative shrink-0">
        <img src="/images/niceLogo.png" alt="" className="" />
      </div>
      <span className="text-[#a9b1c1] text-[12px] font-medium leading-[18px] tracking-[-0.18px] whitespace-nowrap">
        나이스페이먼츠 에스크로 확인증
      </span>
    </div>
  );
}


function Divider() {
  return <div className="w-full border-t border-dashed border-[#1b1f2a]" />;
}

function FooterLogo() {
  return (
    <div className="flex items-center gap-1">
      <img src="/icons/footer-logo-icon.svg" width={28} height={28} alt="zerofee" />
      <img src="/icons/footer-logo-text.svg" width={106} height={20} alt="" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0e14] border-t border-[#1b1f2a]">
      <div className="w-full max-w-[1360px] mx-auto px-5 md:px-10 py-[52px] flex flex-col gap-4">

        {/* 모바일: 로고+면책, 뱃지 세로 배치 */}
        <div className="flex md:hidden flex-col gap-4">
          <div className="flex flex-col gap-1">
            <FooterLogo />
            <p className="text-[#a9b1c1] text-[12px] font-medium leading-4 tracking-[-0.12px]">
              클래스잇은 통신판매 중개자이며, 통신판매의 당사자가 아닙니다.
            </p>
          </div>

        </div>

        {/* 데스크탑: 로고+면책 왼쪽, 뱃지 오른쪽 */}
        <div className="hidden md:flex items-start gap-1 w-full">
          <div className="flex-1 flex flex-col gap-1">
            <FooterLogo />
            <p className="text-[#a9b1c1] text-[12px] font-medium leading-4 tracking-[-0.12px]">
              클래스잇은 통신판매 중개자이며, 통신판매의 당사자가 아닙니다.
            </p>
          </div>
          <NiceBadge />
        </div>

        <Divider />

        {/* 링크 + 고객센터 */}
        <div className="flex flex-col gap-4 text-[12px] text-[#a9b1c1] leading-4 tracking-[-0.12px]">
          <a href="/terms" className="font-medium hover:text-[#f8faff] transition-colors w-fit">이용약관</a>
          <a href="/privacy" className="font-bold hover:text-[#f8faff] transition-colors w-fit">개인정보처리방침</a>
          <div className="flex flex-col gap-1 font-medium">
            <p>고객센터</p>
            <p>전화번호 : 010-3242-8118</p>
            <p>주중 09~18시 (점심시간 12~13시 30분 / 주말 및 공휴일 제외)</p>
          </div>
        </div>

        <Divider />

        {/* 사업자 정보 */}
        <div className="flex flex-col gap-1 text-[12px] text-[#a9b1c1] leading-4 tracking-[-0.12px] font-medium">
          <p>사업자등록번호 : 519-43-01174  |  대표 : 이동규 | 개인정보처리담당자 : 이동규</p>
          <p>주소 : 경기도 고양시 덕양구 동축로70, A동 9층 901호(동산동, 현대프리미어캠퍼스)</p>
          <p>통신판매업신고번호 : 2026-고양덕양구-1043</p>
          <p>메일 : classit.official@gmail.com</p>
          <p className="font-bold">Copyright ⓒ 2026 classit. All rights reserved.</p>
        </div>

        {/* 모바일에서만 보이게 */}
        <div className="md:hidden flex flex-col gap-1 flex-wrap">
          <NiceBadge />
        </div>

      </div>
    </footer>
  );
}
