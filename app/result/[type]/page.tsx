"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type ResultInfo = {
  title: string;
  description: string;
  ribbon: string; // background stripe color
  brandCount: 1 | 2; // number of brand images to place
};

const resultData: Record<string, ResultInfo> = {
  1: {
    title: "가성비있게 먹을래",
    ribbon: "#F8D549",
    brandCount: 1,
    description:
      "이마트의 노브랜드·오케이프라이스 상품은 바로 당신을 위한 보물창고!\n\n필요한 건 꼭 챙기면서도 합리적인 선택을 중시하죠. 같은 맛이라면 더 합리적인 가격에, 같은 가격이라면 더 넉넉하게 즐길 수 있는 걸 찾아내는 능력이 뛰어난 타입이에요.",
  },
  2: {
    title: "나를 위해 먹을래",
    ribbon: "#2AC6A5",
    brandCount: 2,
    description:
      "자신의 취향을 누구보다 잘 아는 타입!\n\n원하는 맛과 식감을 정확히 알고, 좋은 품질이라면 기꺼이 선택할 줄 아는 똑똑한 미식가예요.",
  },
  3: {
    title: "새롭게 먹어볼래",
    ribbon: "#F77B72",
    brandCount: 1,
    description:
      "새로운 조합과 시도를 즐기는 탐험가형.\n\n늘 신선한 경험을 찾아 도전하는 타입이에요.",
  },
};

export default function ResultPage() {
  const params = useParams<{ type: string }>();
  const type = params.type;
  const result: ResultInfo = resultData[type] ?? {
    title: "알 수 없음",
    description: "결과 정보를 찾을 수 없어요.",
    ribbon: "#6B7280",
    brandCount: 1,
  };

  function BrandPlaceholders({ count }: { count: 1 | 2 }) {
    if (count === 2) {
      return (
        <>
          <div className="absolute -left-[3vh] -bottom-[3vh] w-[12vh] h-[12vh] rounded-[2vh] bg-white/15 border border-white/25 rotate-[-16deg] flex items-center justify-center text-white/70">
            브랜드1
          </div>
          <div className="absolute -right-[2vh] top-[8%] w-[10vh] h-[10vh] rounded-[2vh] bg-white/15 border border-white/25 rotate-[14deg] flex items-center justify-center text-white/70">
            브랜드2
          </div>
        </>
      );
    }
    return (
      <div className="absolute -left-[3vh] -bottom-[3vh] w-[12vh] h-[12vh] rounded-[2vh] bg-white/15 border border-white/25 rotate-[-16deg] flex items-center justify-center text-white/70">
        브랜드
      </div>
    );
  }

  return (
    <main className="relative flex flex-col w-full h-full px-[3vh] pt-[3vh] pb-[3vh] text-white">
      {/* Top action and title */}
      <div className="w-full flex justify-center">
        <button
          onClick={() => window.print()}
          className="px-[2.4vh] py-[1.2vh] rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[1.05rem]"
        >
          결과지 출력하기
        </button>
      </div>
      <h1 className="mt-[2.6vh] text-center font-ohsquare text-[1.8rem] font-extrabold">
        {result.title}
      </h1>

      {/* Middle: character card with background ribbon and brand images */}
      <div className="relative mt-[4vh] w-full flex justify-center">
        {/* ribbon behind card */}
        <div
          className="absolute -left-[3vh] -right-[3vh] top-1/2 -translate-y-1/2 h-[8vh]"
          style={{ background: result.ribbon }}
        />

        {/* character card placeholder */}
        <div className="relative z-10 w-[44vh] h-[34vh] rounded-[3vh] bg-white/10 border-2 border-white/40 flex items-center justify-center text-white/70">
          캐릭터 이미지
          {/* brand placeholders */}
          <BrandPlaceholders count={result.brandCount} />
        </div>
      </div>

      {/* Description */}
      <div className="mt-[3vh] text-[1.02rem] leading-relaxed opacity-95">
        {result.description.split("\n\n").map((para, i) => (
          <p key={i} className={i === 0 ? "mb-[1.8vh]" : "mt-[1.8vh]"}>
            {para}
          </p>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto w-full">
        <Link href={`/photo/${type}`} aria-label="내 취향 네컷 찍기">
          <button className="w-full py-[2.2vh] rounded-full bg-white text-[#160449] font-ohsquare text-[1.35rem] font-extrabold shadow-[0_0.8vh_2vh_rgba(0,0,0,0.35)]">
            내 취향 네컷 찍기
          </button>
        </Link>
      </div>
    </main>
  );
}
