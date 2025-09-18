import Link from "next/link";

export default function Home() {
    return (
        <main
            className="relative flex flex-col items-center w-full h-full
        bg-gradient-to-b from-[#150348] to-[#3308AE]
        px-[7.2vh] pt-[6.6vh] pb-[7.2vh] text-white"
        >
            <div>
                <img
                    src="/assets/e-logo.svg"
                    className="h-[3.1vh] opacity-80"
                    alt=""
                />
            </div>

            {/* Headline */}
            <div className="flex flex-col font-ohsquare mt-[2.4vh] text-center leading-[1] gap-[0.6vh]">
                <p className="text-[6.8vh]">마구와구</p>
                <p className="text-[6.8vh]">먹어봤니</p>
            </div>

            {/* Hero: hexagon centered; static -30deg rotation (animation later) */}
            <div className="relative mt-[12vh] w-full flex items-center justify-center origin-center rotate-[-90deg]">
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

            {/* Fixed Footer */}
            <footer className="fixed bottom-0 left-0 w-full px-[7.2vh] pb-[12vh] bg-transparent">
                <p className="text-[3vh] font-ohsquare text-center pb-[4vh]">
                    하하하하하
                </p>

                <Link href="/test" aria-label="내 취향 테스트 시작">
                    <button className="text-[3vh] font-ohsquare w-full py-[2.2vh] rounded-full bg-white text-[#160449]">
                        내 취향 테스트
                    </button>
                </Link>
            </footer>
        </main>
    );
}
