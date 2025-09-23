import React, { useState } from "react";
import Link from "next/link";
import { ResultInfo } from "./resultData";
import { useRouter } from "next/navigation";
import ExitModal from "@/app/components/exitModal";

type ResultDetailProps = {
    result: ResultInfo;
};

const ResultDetail: React.FC<ResultDetailProps> = ({ result }) => {
    const router = useRouter();
    const [showExitModal, setShowExitModal] = useState(false);

    return (
        <div
            className="relative flex flex-col items-center w-full min-h-screen
        bg-gradient-to-b from-[#150348] to-[#3308AE]
        px-[3.6vh] text-white"
        >
            <div className="absolute top-[3.6vh] right-[3vh] z-10">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-[1vh] px-[1.2vh] py-[1.2vh] rounded-full bg-white/20 hover:bg-white/15 transition-colors"
                >
                    <img src="/cancle.svg" className="h-[3.6vh]" alt="" />
                </button>
            </div>

            {/* Top header */}
            <div className="relative w-full flex flex-col items-center mt-[6vh]">
                <div className="flex flex-col items-center">
                    <div className="px-[1.5vh] py-[0.6vh] bg-white/20 rounded-[0.9vh]">
                        <p className="font-pretendard text-[2.1vh] leading-1.4">
                            내 디저트 취향은?
                        </p>
                    </div>
                    <img src="/bubble-poly.svg" className="w-[1.5vh]" alt="" />
                </div>
                <p
                    className="font-ohsquare text-[8.1vh] leading-1.1 text-transparent bg-clip-text bg-gradient-to-b"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${result.titleGradient[0]}, ${result.titleGradient[1]})`,
                    }}
                >
                    {result.title}
                </p>
            </div>

            {/* Images absolute positioned */}
            <img
                src={result.images[0].imageUrl}
                alt="left decoration"
                className={`absolute left-[75%] top-[1%] -translate-x-1/2 -translate-y-1/2 ${result.images[0].size} pointer-events-none select-none`}
            />

            <img
                src={result.images[1].imageUrl}
                alt="right decoration"
                className={`absolute left-[5%] top-[12%] -translate-x-1/2 -translate-y-1/2 ${result.images[1].size} pointer-events-none select-none`}
            />

            <img
                src={result.images[2].imageUrl}
                alt="character"
                className={`absolute left-[90%] top-[25%] -translate-x-1/2 -translate-y-1/2 ${result.images[2].size} object-contain pointer-events-none select-none`}
            />

            {/* Description */}
            <div
                className="mt-[3vh] w-full flex flex-col items-center px-[3vh] py-[4.2vh] gap-[5.4vh] backdrop-blur-xs rounded-[2.4vh] bg-white/10
            font-pretendard text-white h-[70vh] overflow-y-auto touch-pan-y overscroll-y-contain"
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                <div className="w-full text-left leading-1.4">
                    <p className="text-[2.8vh] font-semibold">
                        나의 취향은 이마트의 <br />
                        <span style={{ color: result.brandColor }}>
                            {result.descriptionTitle}
                        </span>{" "}
                        디저트!
                    </p>
                    <p className="mt-[2.4vh] text-[2.4vh] text-[#EFEFEF] font-extralight break-keep">
                        {result.description}
                    </p>
                </div>

                {/* Desserts Grid */}
                <div className="grid grid-cols-2 grid-rows-3 gap-y-[3.6vh] gap-x-[1.8vh] w-full">
                    {result.desserts.map((dessert, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center gap-[0.9vh]"
                        >
                            <div
                                className="relative w-full aspect-square flex items-center justify-center rounded-[2.4vh] overflow-hidden bg-clip-padding"
                                style={{
                                    backgroundImage: `linear-gradient(
                                                      to bottom,
                                                      ${result.dessertGradient[0]} -50%,
                                                      ${result.dessertGradient[1]} 50%,
                                                      ${result.dessertGradient[2]} 110%
                                                    )`,
                                }}
                            >
                                <img
                                    src={dessert.imageUrl}
                                    alt={dessert.name}
                                    className="object-contain w-[95%]"
                                />
                            </div>
                            <span className="mt-[1.2vh] text-[2.4vh] text-[#EFEFEF] font-extralight text-center whitespace-pre-line font-pretendard">
                                {dessert.name}
                            </span>
                        </div>
                    ))}
                </div>
                <footer className="justify-center flex flex-col gap-[1.8vh] py-[6vh]">
                    <p className="font-pretendard text-[2.4vh] text-[#EFEFEF] font-extralight">
                        {result.title} 프레임으로 사진찍을 수 있어요!
                    </p>
                    <Link
                        href={`/photo/${result.id}`}
                        aria-label="내 취향 테스트 시작"
                    >
                        <button className="text-[3.2vh] font-ohsquare w-full px-[3.9vh] py-[1.4vh] leading-[1.28] rounded-full bg-white text-[#160449]">
                            내 취향 한 컷 찍기
                        </button>
                    </Link>
                </footer>
            </div>

            {/* <footer
                className="fixed justify-center flex bottom-0 left-0 min-w-full px-[7.2vh] pb-[6vh]
            bg-[linear-gradient(to_bottom,#3308AE40_0%,#3308AE90_30%,#3308AE_100%)]"
            >
                <Link
                    href={`/photo/${result.id}`}
                    aria-label="내 취향 테스트 시작"
                >
                    <button className="text-[3.2vh] font-ohsquare w-full px-[3.9vh] py-[1.4vh] leading-[1.28] rounded-full bg-white text-[#160449]">
                        내 취향 한 컷 찍기
                    </button>
                </Link>
            </footer> */}

            {/* 홈 이동 확인 모달 */}
            {showExitModal && (
                <div className="fixed inset-0 z-[100]">
                    <ExitModal
                        onCancel={() => setShowExitModal(false)}
                        onConfirm={() => router.push("/")}
                    />
                </div>
            )}
        </div>
    );
};

export default ResultDetail;
