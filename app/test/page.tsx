"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: 1,
    topText: "평소에 생각이 적은 편이다",
    bottomText: "평소에 생각이 많은 편이다",
    type: "1",
  },
  {
    id: 2,
    topText: "싸고 맛있어 놀라는 과자",
    bottomText: "비싸도 납득되는 과자",
    type: "1",
  },
  {
    id: 3,
    topText: "특별한 경험을 주는 프리미엄 디저트가 끌린다",
    bottomText: "가볍게 즐기는 친근한 디저트가 끌린다",
    type: "2",
  },
  {
    id: 4,
    topText: "나는 디저트에 진심이다",
    bottomText: "디저트는 즐겨 먹지 않는다",
    type: "2",
  },
  {
    id: 5,
    topText: "칼로리 먼저 따져보는 편이다",
    bottomText: "눈길 끌면 바로 집는 편이다",
    type: "3",
  },
  {
    id: 6,
    topText: "재료 본연의 맛이 담긴 제품을 추구한다",
    bottomText: "가공되어 자극적인 맛의 제품을 추구한다",
    type: "3",
  },
];

const choices = [
  { value: 5, size: "w-[10vh] h-[10vh]" }, // 가장 큼
  { value: 4, size: "w-[8vh] h-[8vh]" },
  { value: 3, size: "w-[6vh] h-[6vh]" },
  { value: 2, size: "w-[8vh] h-[8vh]" },
  { value: 1, size: "w-[10vh] h-[10vh]" }, // 가장 큼
];

export default function TestPage() {
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
        const max = Math.max(...Object.values(totals));
        const top = Object.keys(totals).filter((k) => totals[k] === max);
        const resultType = top[Math.floor(Math.random() * top.length)];
        router.push(`/result/${resultType}`);
      }
    }, 400);
  }

  function handlePrev() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <main className="relative flex flex-col items-center justify-between w-full h-full p-[3vh] text-white">
      {/* Home button at top */}
      <div className="absolute top-[2vh] right-[2vh] z-10">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-[1vh] px-[2vh] py-[1.2vh] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition-colors"
        >
          <span className="text-[1.1rem] font-semibold">홈</span>
        </button>
      </div>
      {/* Top header */}
      <div className="w-full flex flex-col items-center gap-[2vh] mt-[2vh]">
        <p className="text-[2rem] font-extrabold">Q{index + 1}</p>
        <div className="w-[24vh] h-[1.2vh] rounded-full bg-[#3a2a6a]/80 overflow-hidden">
          <div
            className="h-full bg-[#FFCA2C] transition-all duration-500"
            style={{ width: `${Math.max(4, progress)}%` }}
          />
        </div>
      </div>

      {/* Middle content with hourglass-like band */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center gap-[4vh]">
        <p className="text-[1.6rem] font-bold text-center leading-snug px-[4vw]">
          {questions[index].topText}
        </p>

        <div className="relative flex flex-col items-center gap-[3.4vh]">
          {choices.map((c) => (
            <button
              key={c.value}
              onClick={() => handleAnswer(c.value)}
              className={`relative flex items-center justify-center rounded-full border-[0.8vh] transition-all duration-300 ${
                c.size
              } ${
                selectedChoice === c.value
                  ? "border-[#c8b6ff]"
                  : "border-[#c8b6ff]/60"
              }`}
            >
              {selectedChoice === c.value && (
                <span className="absolute w-[80%] h-[80%] rounded-full bg-[#c8b6ff]/70"></span>
              )}
            </button>
          ))}
        </div>

        <p className="text-[1.6rem] font-bold text-center leading-snug px-[4vw]">
          {questions[index].bottomText}
        </p>
      </div>

      {/* Bottom actions */}
      <div className="w-full flex items-center justify-center mb-[2vh]">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="flex items-center gap-[1vh] px-[3vh] py-[1.6vh] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="text-[1.6rem] leading-none">←</span>
          <span className="text-[1.2rem] font-semibold">이전</span>
        </button>
      </div>
    </main>
  );
}
