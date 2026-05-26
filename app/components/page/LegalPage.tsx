import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export interface LegalSection {
  title: string;
  content?: string;
  isChapter?: boolean;
}

interface LegalPageProps {
  title: string;
  effectiveDate: string;
  sections: LegalSection[];
  addendum?: string;
}

function normalizeLegalText(value: string) {
  return value.replace(/\\n/g, "\n");
}

export default function LegalPage({ title, effectiveDate, sections, addendum }: LegalPageProps) {
  return (
    <main className="bg-[#0b0e14]">
      <Header />

      <div className="w-full max-w-[860px] mx-auto px-5 md:px-10 pt-[160px] pb-[120px]">
        {/* 제목 */}
        <div className="flex flex-col gap-3 mb-12">
          <h1 className="text-[#f8faff] text-[32px] md:text-[40px] font-black leading-[1.3] tracking-[-0.8px]">
            {title}
          </h1>
          <p className="text-[#a9b1c1] text-[14px] font-medium leading-[21px] tracking-[-0.21px]">
            시행일: {effectiveDate}
          </p>
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-6">
          {sections.map((section, i) =>
            section.isChapter ? (
              <h2
                key={i}
                className="text-[#f8faff] text-[18px] font-bold leading-[27px] tracking-[-0.27px] mt-6 first:mt-0"
              >
                {section.title}
              </h2>
            ) : (
              <div key={i} className="flex flex-col gap-2 pl-0">
                <h3 className="text-[#f8faff] text-[14px] font-bold leading-[21px] tracking-[-0.21px]">
                  {section.title}
                </h3>
                {section.content && (
                  <p className="text-[#a9b1c1] text-[14px] font-medium leading-[21px] tracking-[-0.21px] whitespace-pre-wrap">
                    {normalizeLegalText(section.content)}
                  </p>
                )}
              </div>
            )
          )}

          {addendum && (
            <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-[#1b1f2a]">
              <h3 className="text-[#f8faff] text-[14px] font-bold leading-[21px] tracking-[-0.21px]">부칙</h3>
              <p className="text-[#a9b1c1] text-[14px] font-medium leading-[21px] tracking-[-0.21px] whitespace-pre-wrap">
                {normalizeLegalText(addendum)}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
