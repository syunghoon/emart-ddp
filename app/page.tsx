"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CardId = "magu" | "smsm" | "misik";
type CardOrder = [CardId, CardId, CardId];

const POSITIONS = ["left", "center", "right"] as const;
type Position = (typeof POSITIONS)[number];

const ROTATION_INTERVAL = 2500;

const CARDS: Record<CardId, { image: string; label: string }> = {
    magu: { image: "/assets/magu-card.png", label: "마구와구" },
    smsm: { image: "/assets/smsm-card.png", label: "슴슴한입" },
    misik: { image: "/assets/misik-card.png", label: "미식고집" },
};

const POSITION_STYLES: Record<
    Position,
    {
        transform: string;
        width: string;
        height: string;
        zIndex: number;
        opacity: number;
        filter: string;
        transition: string;
    }
> = {
    left: {
        transform:
            "translate(-60%, -50%) rotate(-150deg) translateX(20vh) rotate(90deg)",
        width: "28vh",
        height: "28vh",
        zIndex: 5,
        opacity: 0.85,
        filter: "brightness(0.9)",
        transition:
            "transform 0.7s ease, width 0.7s ease, height 0.7s ease, opacity 0.7s ease, filter 0.7s ease",
    },
    center: {
        transform:
            "translate(-50%, -50%) rotate(-90deg) translateX(16vh) rotate(90deg)",
        width: "33vh",
        height: "33vh",
        zIndex: 20,
        opacity: 1,
        filter: "brightness(1)",
        transition:
            "transform 0.7s ease, width 0.7s ease, height 0.7s ease, opacity 0.7s ease, filter 0.7s ease",
    },
    right: {
        transform:
            "translate(-40%, -50%) rotate(-30deg) translateX(20vh) rotate(90deg)",
        width: "28vh",
        height: "28vh",
        zIndex: 10,
        opacity: 0.85,
        filter: "brightness(0.9)",
        transition:
            "transform 0.7s ease, width 0.7s ease, height 0.7s ease, opacity 0.7s ease, filter 0.7s ease",
    },
};

export default function Home() {
    const [order, setOrder] = useState<CardOrder>(["smsm", "magu", "misik"]);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setOrder(([left, center, right]) => [center, right, left]);
        }, ROTATION_INTERVAL);

        return () => window.clearInterval(intervalId);
    }, []);

    const positionById = useMemo<Record<CardId, Position>>(() => {
        return order.reduce((acc, cardId, index) => {
            acc[cardId] = POSITIONS[index];
            return acc;
        }, {} as Record<CardId, Position>);
    }, [order]);

    const currentTitle = CARDS[order[1]].label;

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
                <p id="title" className="text-[6.8vh]">
                    {currentTitle}
                </p>
                <p className="text-[6.8vh]">먹어봤니</p>
            </div>

            {/* Hero: rotating cards */}
            <div className="relative mt-[16vh] w-full flex items-center justify-center origin-center">
                <div className="relative w-[44vh] h-[44vh]">
                    {Object.keys(CARDS).map((key) => {
                        const cardId = key as CardId;
                        const { image } = CARDS[cardId];
                        const position = positionById[cardId];
                        const style = POSITION_STYLES[position];

                        return (
                            <img
                                key={cardId}
                                src={image}
                                className="absolute left-1/2 top-1/2 rounded-[2.2vh] shadow-[0_0.66vh_5.3vh_0_rgba(21,3,72,0.30)]"
                                style={style}
                                alt=""
                            />
                        );
                    })}
                </div>
            </div>

            <footer className="absolute bottom-0 left-0 w-full px-[7.2vh] mb-[12vh] bg-transparent">
                <p className="text-[2.4vh] font-pretendard leading-[1.2] text-center pb-[1.8vh]">
                    당신의 디저트 취향을 찾아드려요!
                </p>

                <Link href="/test">
                    <button className="text-[3.6vh] font-ohsquare w-full py-[1.4vh] leading-[1.28] rounded-full bg-white text-[#160449]">
                        내 취향 테스트
                    </button>
                </Link>
            </footer>
        </main>
    );
}
