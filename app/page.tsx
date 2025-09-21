import Link from "next/link";

export default function Home() {
    return (
        <main
            className="relative flex flex-col items-center w-full h-full
        bg-gradient-to-b from-[#150348] to-[#3308AE]
        px-[7.2vh] text-white "
        >
            <div>
                <img
                    src="/assets/e-logo.svg"
                    className="mt-[6.6vh] h-[3.1vh] opacity-80"
                    alt=""
                />
            </div>

            {/* Headline */}
            <div className="flex flex-col font-ohsquare mt-[2.4vh] text-center leading-[1] gap-[0.6vh]">
                <p className="text-[6.8vh]">마구와구</p>
                <p className="text-[6.8vh]">먹어봤니</p>
            </div>

            {/* Hero: hexagon centered; static -30deg rotation (animation later) */}
            <div className="relative mt-[16vh] w-full flex items-center justify-center origin-center">
                <div className="relative w-[44vh] h-[44vh]">
                    <img
                        src="/assets/smsm-card.png"
                        className="absolute left-1/2 top-1/2 w-[28vh] h-[28vh] rounded-[2.2vh] shadow-2xl"
                        style={{
                            transform:
                                "translate(-60%, -50%) rotate(-150deg) translateX(20vh) rotate(90deg)",
                        }}
                    />
                    <img
                        src="/assets/misik-card.png"
                        className="absolute left-1/2 top-1/2 w-[28vh] h-[28vh] rounded-[2.2vh] shadow-2xl"
                        style={{
                            transform:
                                "translate(-40%, -50%) rotate(-30deg) translateX(20vh) rotate(90deg)",
                        }}
                    />
                    <img
                        src="/assets/magu-card.png"
                        className="absolute left-1/2 top-1/2 w-[33vh] h-[33vh] rounded-[2.2vh] shadow-2xl"
                        style={{
                            transform:
                                "translate(-50%, -50%) rotate(-90deg) translateX(16vh) rotate(90deg)",
                        }}
                    />
                </div>
            </div>

            <footer className="absolute bottom-0 left-0 w-full px-[7.2vh] mb-[12vh] bg-transparent">
                <p className="text-[2.4vh] font-pretendard leading-[1.2] text-center pb-[1.8vh]">
                    디저트 취향을 찾아드려요!
                </p>

                <Link href="/test" aria-label="내 취향 테스트 시작">
                    <button className="text-[3.6vh] font-ohsquare w-full py-[1.4vh] leading-[1.28] rounded-full bg-white text-[#160449]">
                        내 취향 테스트
                    </button>
                </Link>
            </footer>
        </main>
    );
}
