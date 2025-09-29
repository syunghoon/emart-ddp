"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ExitModal from "@/app/components/exitModal";
import LoadModal from "@/app/components/loadModal";

const questions = [
    {
        id: 1,
        question: "카페에 갔을 때 디저트는?",
        leftLabel: "안 먹는다",
        rightLabel: "꼭 시킨다",
        type: "1",
    },
    {
        id: 2,
        question: "디저트를 고른다면?",
        leftLabel: "익숙한 것",
        rightLabel: "특별한 것",
        type: "1",
    },
    {
        id: 3,
        question: "평소에 나는?",
        leftLabel: "생각이 많다",
        rightLabel: "단순하다",
        type: "2",
    },
    {
        id: 4,
        question: "과자를 고를 때 나는?",
        leftLabel: "퀄리티 먼저",
        rightLabel: "가성비 먼저",
        type: "2",
    },
    {
        id: 5,
        question: "과자 고를 때 내 시선은?",
        leftLabel: "포장 / 가격",
        rightLabel: "칼로리 정보",
        type: "3",
    },
    {
        id: 6,
        question: "더 끌리는 맛은?",
        leftLabel: "속세의 맛",
        rightLabel: "담백한 맛",
        type: "3",
    },
];

const choices = [
    { value: 5, size: "w-[9.6vh] h-[9.6vh]" }, // 가장 큼
    { value: 4, size: "w-[6.3vh] h-[6.3vh]" },
    { value: 3, size: "w-[4vh] h-[4vh]" },
    { value: 2, size: "w-[6.3vh] h-[6.3vh]" },
    { value: 1, size: "w-[9.6vh] h-[9.6vh]" }, // 가장 큼
];

export default function TestPage() {
    const [showExitModal, setShowExitModal] = useState(false);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(
        Array(questions.length).fill(null)
    );
    const router = useRouter();

    const progress = useMemo(() => (index / questions.length) * 100, [index]);
    const selectedChoice = answers[index];

    function handleAnswer(choice: number) {
        const next = [...answers];
        next[index] = choice;
        setAnswers(next);
        setTimeout(() => {
            if (index + 1 < questions.length) {
                setIndex(index + 1);
            } else {
                // Calculate scores by type
                const totals: { [key: string]: number } = {};
                next.forEach((val, i) => {
                    if (val != null) {
                        const t = questions[i].type;
                        totals[t] = (totals[t] ?? 0) + val;
                    }
                });
                setShowLoadModal(true);
                const max = Math.max(...Object.values(totals));
                const top = Object.keys(totals).filter(
                    (k) => totals[k] === max
                );
                const resultType = top[Math.floor(Math.random() * top.length)];
                router.push(`/result/${resultType}`);
            }
        }, 400);
    }

    function handlePrev() {
        if (index > 0) setIndex(index - 1);
    }

    return (
        <main
            className="relative flex flex-col items-center w-full h-full 
            bg-[#160449] bg-[url('/test-bg.svg')] bg-no-repeat bg-center bg-cover 
            px-[7.2vh] text-white"
        >
            <div className="absolute top-[3.6vh] right-[3vh] z-10">
                <button
                    onClick={() => setShowExitModal(true)}
                    aria-label="홈으로"
                    className="flex items-center gap-[1vh] px-[1.2vh] py-[1.2vh] rounded-full bg-white/20 hover:bg-white/15 transition-colors"
                >
                    <img src="/cancle.svg" className="h-[3.6vh]" alt="" />
                </button>
            </div>
            {/* Top header */}
            <div className="w-full flex flex-col items-center gap-[0.6vh] mt-[6vh]">
                <p className="font-ohsquare text-[3.6vh] leading-1.4">
                    Q{index + 1}
                </p>
                <div
                    className="w-[12vh] h-[2.1vh] bg-white/20 overflow-hidden
                                [mask-image:url('/assets/mask-vector.svg')]
                                [mask-repeat:no-repeat]
                                [mask-size:cover]
                                [-webkit-mask-image:url('/assets/mask-vector.svg')]
                                [-webkit-mask-repeat:no-repeat]
                                [-webkit-mask-size:cover]"
                >
                    <div
                        className="h-full bg-[#515DFF] transition-all duration-500"
                        style={{ width: `${Math.max(4, progress)}%` }}
                    />
                </div>
            </div>
            <div className="w-full mt-[10.2vh]">
                <p className="text-[3.3vh] font-semibold text-center leading-[1.4]">
                    {questions[index].question}
                </p>

                <div className="mt-[20vh] flex flex-row justify-center w-[42vh] gap-[1.8vh]">
                    {choices.map((c) => (
                        <div className="" key={c.value}>
                            <div className="h-[9.6vh] flex items-center justify-center">
                                <button
                                    onClick={() => handleAnswer(c.value)}
                                    className={`relative flex items-center justify-center rounded-full border-[0.5vh] transition-all duration-100 ${
                                        c.size
                                    } ${
                                        selectedChoice === c.value
                                            ? "border-[#D6C8FF]/80"
                                            : "border-[#D6C8FF]"
                                    }`}
                                >
                                    {selectedChoice === c.value && (
                                        <img
                                            src="/assets/radio-checked.png"
                                            className="absolute w-[90%] h-[90%] rounded-full"
                                            alt=""
                                        />
                                    )}
                                </button>
                            </div>

                            <div className="flex w-full justify-center items-center text-center overflow-visible">
                                {(c.value === 5 || c.value === 1) && (
                                    <div className="relative w-[9.6vh]">
                                        <span className="absolute left-1/2 -translate-x-1/2 font-pretendard mt-[1.8vh] text-[2.4vh] leading-1.4 font-medium whitespace-nowrap">
                                            {c.value === 5
                                                ? questions[index].leftLabel
                                                : questions[index].rightLabel}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="absolute justify-center flex bottom-0 left-0 w-full px-[7.2vh] mb-[12vh] bg-transparent">
                <button
                    onClick={handlePrev}
                    disabled={index === 0}
                    className="flex items-center gap-[0.9vh] px-[2.4vh] py-[1.5vh] rounded-full bg-white/20 backdrop-blur-md disabled:opacity-40"
                >
                    <img src="/line+arrow.svg" className="h-[3.6vh]" alt="" />
                    <span className="font-pretendard text-[2.7vh] leading-1.3 font-semibold">
                        이전
                    </span>
                </button>
            </footer>

            {/* 홈 이동 확인 모달 */}
            {showExitModal && (
                <div className="inset-0 z-100">
                    <ExitModal
                        onCancel={() => setShowExitModal(false)}
                        onConfirm={() => router.push("/")}
                    />
                </div>
            )}

            {/* 결과 페이지 이동 모달 */}
            {showLoadModal && (
                <div className="inset-0 z-100">
                    <LoadModal type="loading" />
                </div>
            )}
        </main>
    );
}
