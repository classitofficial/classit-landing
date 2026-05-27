const faqs = [
  {
    question: "Q. 클래스잇은 어떤 서비스 인가요?",
    answer: (
      <>
        <p className="mb-0">복잡한 개발 없이 &apos;인터넷 강의 플랫폼&apos;을 구축해 드리는 올인원 솔루션입니다.</p>
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
    question: "Q. 클래스잇으로 VOD 강의를 판매할 수 있나요?",
    answer: (
      <>
        <p className="mb-0">네, 클래스잇을 통해 VOD 강의를 판매하고 운영할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">학생은 결제 후 정해진 수강 기간 동안 강의를 시청할 수 있으며,</p>
        <p className="mb-0">선생님은 수강생의 결제 내역, 수강 기간, 학습 시간, 진도율 등을 관리할 수 있습니다.</p>
      </>
    ),
  },
  {
    question: "Q. 학원도 클래스잇을 사용할 수 있나요?",
    answer: (
      <>
        <p className="mb-0">네, 개인 강사뿐만 아니라 학원, 교육기관, 온라인 교육 사업자도 사용할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">오프라인 학원이 보강 영상, 온라인 강의, VOD 클래스, 학습 리포트, 결제 자동화 시스템을 운영하고 싶을 때 활용할 수 있습니다.</p>
      </>
    ),
  },
  {
    question: "Q. AI 수강생 관리는 어떤 기능인가요?",
    answer: (
      <>
        <p className="mb-0">AI 수강생 관리는 수강생의 질문 답변과 과제 피드백을 AI가 보조하거나 대신 처리할 수 있도록 돕는 기능입니다.</p>
        <p className="mt-[21px] mb-0">수강생이 강의 내용에 대해 질문을 남기거나 과제를 제출하면,</p>
        <p className="mb-0">AI가 학습 내용을 바탕으로 답변이나 피드백 초안을 생성할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">이를 통해 선생님은 반복적인 질문 응대와 과제 확인에 드는 시간을 줄이고,</p>
        <p className="mb-0">더 중요한 지도나 개별 관리에 집중할 수 있습니다.</p>
      </>
    ),
  },
  {
    question: "Q. 결제 기능도 연동할 수 있나요?",
    answer: (
      <>
        <p className="mb-0">네, 클래스잇은 나이스페이먼츠 공식 제휴사로 온라인 클래스 판매를 위한 결제 기능을 더 낮은 수수료로 연동할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">학생은 원하는 클래스를 결제하고, 결제 완료 후 강의실에서 수강할 수 있습니다.</p>
        <p className="mb-0">선생님는 관리자 페이지에서 결제 금액, 결제 일시, 수강 클래스, 수강 기간 등을 확인할 수 있습니다.</p>
      </>
    ),
  },
  {
    question: "Q. 결제 완료 알림톡도 자동으로 보낼 수 있나요?",
    answer: (
      <>
        <p className="mb-0">네, 카카오 알림톡 연동으로 결제 완료, 수강 시작, 주간 학습 리포트, 질문 답변, 피드백 등록 등</p>
        <p className="mb-0">주요 이벤트에 맞춰 알림톡 자동 발송 기능을 구성할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">이를 통해 선생님은 반복 안내 업무를 줄이고, 할생은 필요한 정보를 빠르게 확인할 수 있습니다.</p>
      </>
    ),
  },
  {
    question: "Q. 수강생의 학습 시간을 확인할 수 있나요?",
    answer: (
      <>
        <p className="mb-0">네, 클래스잇에서 수강생의 학습 시간을 확인할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">운영자는 총 학습 시간, 강의별 학습 시간, 진도율, 접속 기록 등 학습 현황을 확인할 수 있으며,</p>
        <p className="mb-0">수강생에게 주간 학습 리포트 형태로 안내할 수도 있습니다.</p>
        <p className="mt-[21px] mb-0">주간 학습 리포트에서는 학습 기간, 총 학습 시간, 진도율, 연속 접속일, 강의별 학습 시간 등의 정보를 확인할 수 있습니다.</p>
      </>
    ),
  },
  {
    question: "Q. 수강생의 학습 시간을 확인할 수 있나요?",
    answer: (
      <>
        <p className="mb-0">네, 수강생이 강의와 관련된 질문을 남기고,</p>
        <p className="mb-0">선생님이 답변을 등록할 수 있는 질문 답변 기능을 제공할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">답변이 등록되면 수강생에게 알림톡을 보내 답변 확인을 안내할 수 있습니다.</p>
      </>
    ),
  },
  {
    question: "Q. 클래스잇 도입 시 초기 세팅비가 발생하나요?",
    answer: (
      <>
        <p className="mb-0">네, 클래스잇은 서비스 초기 설정을 위해 최초 1회 초기 세팅비가 발생할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">초기 세팅비에는 강의실 구성, 관리자 페이지 설정, 결제 연동, 알림톡 기본 세팅, 수강 구조 설정 등이 포함될 수 있습니다.</p>
        <p className="mb-0">실제 포함 범위는 선택한 상품과 구축 범위에 따라 달라집니다.</p>
      </>
    ),
  },
  {
    question: "Q. 기존 학원 홈페이지가 있어도 클래스잇을 사용할 수 있나요?",
    answer: (
      <>
        <p className="mb-0">네, 기존에 사용 중인 인터넷 강의 플랫폼이나 학원 홈페이지가 있어도 클래스잇을 사용할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">기존 홈페이지는 홍보용으로 유지하고,</p>
        <p className="mb-0">실제 강의 수강, 결제, 수강생 관리, 학습 리포트 등은 클래스잇에서 운영하는 방식으로 구성할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">또한 이전에 사용 중이던 인터넷 강의 플랫폼이 있다면,</p>
        <p className="mb-0">수강생 정보, 강의 목록, 결제 내역 등 이전이 필요한 데이터를 CSV나 엑셀 파일로 전달해 주세요.</p>
        <p className="mt-[21px] mb-0">클래스잇의 1:1 전담 매니저가 데이터를 확인한 뒤, 서비스 구조에 맞게 데이터 이전을 지원해드립니다.</p>
        <p className="mb-0">단, 이전 가능한 데이터 범위는 기존 플랫폼에서 제공하는 데이터 형식과 항목에 따라 달라질 수 있습니다.</p>
      </>
    ),
  },
  {
    question: "Q. 클래스잇은 모바일과 테블릿에서도 사용할 수 있나요?",
    answer: (
      <>
        <p className="mb-0">네, 클래스잇은 학생이 모바일, 태블릿, PC 환경에서 사용할 수 있도록 구성할 수 있습니다.</p>
        <p className="mt-[21px] mb-0">학생은 모든 기기에서도 강의를 확인하고 학습할 수 있으며,</p>
        <p className="mb-0">선생님은 관리자 페이지를 통해 수강생과 결제, 수강, 질문 내역 등을 관리할 수 있습니다.</p>
      </>
    ),
  },
];

function Divider() {
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
