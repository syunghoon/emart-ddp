import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center w-full h-full px-[3vh] pt-[4vh] pb-[3vh] text-white">
      {/* Top: logo placeholder */}
      <div className="w-[30vh] h-[6vh] rounded-[1.6vh] bg-white/10 border border-white/15 flex items-center justify-center text-white/60">
        로고 자리
      </div>

      {/* Headline */}
      <div className="mt-[3vh] text-center leading-[1.1] flex gap-1.5">
        <p className="font-ohsquare text-[1.9rem] font-extrabold">건강하게</p>
        <p className="font-ohsquare text-[1.9rem] font-extrabold">먹어봤니</p>
      </div>

      {/* Hero: hexagon centered; static -30deg rotation (animation later) */}
      <div className="relative mt-[12vh] w-full flex items-center justify-center origin-center rotate-[-30deg]">
        <div className="relative w-[44vh] h-[44vh]">
          {/* Hexagon placeholder (clip-path) */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vh] h-[30vh] bg-white/15 border border-white/20"
            style={{
              clipPath:
                "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
            }}
          />

          {/* Three squares rotating around the hexagon center at 60° steps */}
          <div
            className="absolute left-1/2 top-1/2 w-[22vh] h-[22vh] bg-white/10 border border-white/20 rounded-[2.2vh]"
            style={{
              transform:
                "translate(-50%, -50%) rotate(-60deg) translateX(16vh) rotate(0deg)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-[22vh] h-[22vh] bg-white/10 border border-white/20 rounded-[2.2vh]"
            style={{
              transform:
                "translate(-50%, -50%) rotate(0deg) translateX(16vh) rotate(0deg)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-[22vh] h-[22vh] bg-white/10 border border-white/20 rounded-[2.2vh]"
            style={{
              transform:
                "translate(-50%, -50%) rotate(60deg) translateX(16vh) rotate(0deg)",
            }}
          />
        </div>
      </div>

      {/* Bottom CTA with improved speech-bubble above it */}
      <div className="mt-auto w-full relative">
        {/* Coupon speech bubble */}
        <div className="absolute -top-[7vh] left-1/2 -translate-x-1/2 z-10">
          <div className="relative px-[2.4vh] py-[1.4vh] w-full rounded-lg bg-white/12 backdrop-blur-md border border-white/30 text-[1.05rem] shadow-[0_0.6vh_1.6vh_rgba(0,0,0,0.25)]">
            어디까지 먹어봤니?
            {/* Tail: layered triangles to simulate border */}
            <div className="absolute left-1/2 -bottom-[1.25vh] -translate-x-1/2">
              <div
                className="relative"
                style={{ width: "2.8vh", height: "1.8vh" }}
              >
                <div
                  className="absolute inset-0 bg-white/30"
                  style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
                />
                <div
                  className="absolute inset-[0.2vh] bg-white/12 backdrop-blur-md"
                  style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
                />
              </div>
            </div>
          </div>
        </div>

        <Link href="/test" aria-label="내 취향 테스트 시작">
          <button className="relative z-0 w-full py-[2.2vh] rounded-full bg-white text-[#160449] font-ohsquare text-[1.4rem] font-extrabold shadow-[0_0.8vh_2vh_rgba(0,0,0,0.35)]">
            내 취향 테스트
          </button>
        </Link>
      </div>
    </main>
  );
}
