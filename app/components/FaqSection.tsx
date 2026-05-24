const faqs = [
  {
    question: "Q. 클래스잇은 어떤 서비스 인가요?",
    answer: (
      <>
        <p className="mb-0">복잡한 개발 없이 '자동화 교육 플랫폼'을 구축해 드리는 올인원 솔루션입니다.</p>
        <p className="mt-[21px] mb-0">수강생 관리부터 결제, 보안까지 플랫폼 운영에 필요한 모든 기능을 완벽하게 제공합니다.</p>
        <ul className="list-disc mt-0 pl-[21px]">
          <li>운영 자동화: AI 기반 교육 운영 및 출결·진도율 관리, 알림톡 자동 발송</li>
          <li>철통 보안 &amp; 독립 플랫폼: 전용 도메인 제공 및 영상·전자책 캡처/녹화 완벽 차단</li>
          <li>올인원 인프라: 결제 모듈(나이스페이먼츠) 즉시 연동, 마케팅(유입/전환) 데이터 제공, 1:1 전담 매니저 배정</li>
        </ul>
      </>
    ),
  },
  {
    question: "Q. 계약 및 도입 절차는 어떻게 되나요?",
    answer: (
      <p>
        ① 데모 확인 → ② 도입 상담 → ③ 계약 절차 → ④ 온보딩 지원(강의 등록, 결제 모듈 세팅 등) → ⑤ 운영 시작순으로 진행됩니다.
      </p>
    ),
  },
  {
    question: "Q. 기존에 쓰던 학원 시스템에서 데이터를 옮길 수 있나요?",
    answer: (
        <p>대부분의 데이터는 CSV나 엑셀로 전달주시면 1:1 전담 매니저가 데이터 이전을 지원해드립니다.</p>
    ),
  },
  {
    question: "Q. 결제 금액에 대한 정산은 어떻게 받을 수 있나요?",
    answer: (
      <p>
        클래스잇은 나이스페이먼츠 공식 제휴사로 나이스페이먼츠 정산 주기(3영업일, 업종에 따라 상이)에 따라 등록하신 계좌로 지급됩니다.
      </p>
    ),
  },
];

function Divider({ highlight }: { highlight?: boolean }) {
  return (
    <div className="w-full h-px" style={{
      background: "linear-gradient(90deg, rgba(94,103,122,0) 0%, rgba(94,103,122,0.4) 49.52%, rgba(94,103,122,0) 100%)"}} 
    />
  );
}

export default function FaqSection() {
  return (
    <section className="flex flex-col items-center gap-8 md:gap-[52px] py-[104px] md:py-[144px] px-5 md:px-10 w-full" style={{ backgroundImage: "url('/images/faq-img-2.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <h2 className="text-[#F8FAFF] text-[28px] font-bold leading-[36px] tracking-[-0.42px] text-center">
        자주 묻는 질문
      </h2>

      <div className="flex flex-col gap-2 w-full md:max-w-[800px]">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 p-4 rounded-2xl border border-[var(--gray-100)] bg-[var(--gray-50)]"
          >
            <p className="text-[#E9ECF2] text-[14px] font-bold leading-[21px]">
              {faq.question}
            </p>
            <Divider />
            <div className="text-[#E9ECF2] text-[14px] font-medium leading-[21px] tracking-[-0.21px]">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
