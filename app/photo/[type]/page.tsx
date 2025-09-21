"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useParams, useRouter } from "next/navigation";

export default function PhotoPage() {
    const webcamRef = useRef<Webcam>(null);
    const params = useParams<{ type: string }>();
    const router = useRouter();
    const [captured, setCaptured] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [preCountdown, setPreCountdown] = useState(10);
    const [showExitModal, setShowExitModal] = useState(false);

    // 프레임 경로 (예: /frame-1.png)
    const framePath = `/frame-${params.type}.png`;

    // 준비되면 10초 카운트다운 후 자동 촬영 (모달 열리면 일시중지)
    useEffect(() => {
        if (!isReady || captured || showExitModal) return;
        setPreCountdown(10);
        const timer = setInterval(() => {
            setPreCountdown((v) => {
                if (v <= 1) {
                    clearInterval(timer);
                    capture();
                    return 0;
                }
                return v - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isReady, captured, showExitModal]);

    // ESC로 모달 닫기
    useEffect(() => {
        if (!showExitModal) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowExitModal(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [showExitModal]);

    function capture() {
        const screenshot = webcamRef.current?.getScreenshot();
        if (!screenshot) return;

        const frame = new Image();
        frame.src = framePath; // public/frame-*.png

        const img = new Image();
        img.src = screenshot;

        Promise.all([img.decode(), frame.decode()]).then(() => {
            // 375x500(3:4)으로 합성
            const width = 375;
            const height = 500;
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // 웹캠 이미지를 좌우반전하여 그리기
            ctx.save();
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, width, height);
            ctx.restore();

            // 프레임 덮어쓰기
            ctx.drawImage(frame, 0, 0, width, height);

            setCaptured(canvas.toDataURL("image/png"));
        });
    }

    function retake() {
        setCaptured(null);
        setIsReady(false);
    }

    function save() {
        if (!captured) return;
        const a = document.createElement("a");
        a.href = captured;
        a.download = `${params.type}_photo.png`;
        a.click();
    }

    function printImage() {
        // 단순 페이지 인쇄 트리거. 필요 시 프린트 전용 오버레이로 확장 가능.
        window.print();
    }

    return (
        <main className="relative flex flex-col items-center h-screen bg-[#150348]">
            {!captured && (
                <>
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                        {/* 웹캠 프리뷰 */}
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/png"
                            className="absolute inset-0 w-full h-full object-cover"
                            videoConstraints={{
                                width: 375,
                                height: 500,
                                facingMode: "user",
                            }}
                            style={{ transform: "scaleX(-1)" }}
                            onUserMedia={() => setIsReady(true)}
                        />
                        {/* 프레임 오버레이 */}
                        <img
                            src={framePath}
                            alt="frame"
                            className="absolute inset-0 w-full h-full pointer-events-none"
                        />
                    </div>

                    {/* 하단 카운트다운 버튼형 표시 */}
                    <div
                        className="fixed bottom-0 mb-[5vh] w-[15vh] h-[15vh] bg-white/20 text-white rounded-full 
                    flex items-center justify-center text-[6.75vh] font-ohsquare"
                    >
                        {preCountdown}
                    </div>
                </>
            )}

            {captured && (
                <>
                    <div className="absolute top-[3.6vh] right-[3vh] z-10">
                        <button
                            onClick={() => setShowExitModal(true)}
                            aria-label="홈으로"
                            className="flex items-center gap-[1vh] px-[1.2vh] py-[1.2vh] rounded-full bg-white/20 hover:bg-white/15 transition-colors"
                        >
                            <img
                                src="/cancle.svg"
                                className="h-[3.6vh]"
                                alt=""
                            />
                        </button>
                    </div>
                    {/* 캡처 프리뷰 (프레임 포함) */}
                    <div className="relative aspect-[3/4] mt-[12vh] w-[90%] z-10">
                        <img
                            src={captured}
                            alt="Captured"
                            className="absolute inset-0 w-full h-full object-contain rounded-[3vh]"
                        />
                        {/* <img
                            src={framePath}
                            alt="frame"
                            className="absolute left-[3vh] right-[3vh] inset-0 w-full h-full pointer-events-none"
                        /> */}

                        <button
                            onClick={retake}
                            className=" absolute left-1/2 -translate-x-1/2 bottom-[-5%] 
                    flex items-center gap-[0.9vh] px-[2.4vh] py-[1.5vh] rounded-full bg-black/20 backdrop-blur-sm
                    text-white border border-white"
                        >
                            <img
                                src="/arrow_round.svg"
                                className="h-[3.6vh]"
                                alt=""
                            />
                            <span className="text-[2.7vh] leading-1.3 font-semibold">
                                다시 찍기
                            </span>
                        </button>
                    </div>
                    <footer className="absolute bottom-0 left-0 w-full px-[7.2vh] mb-[6vh] bg-transparent">
                        <button
                            onClick={printImage}
                            className="text-[3.6vh] font-ohsquare w-full py-[1.4vh] leading-[1.28] rounded-full bg-white text-[#160449]"
                        >
                            사진 출력하기
                        </button>
                    </footer>
                </>
            )}

            {/* 홈 이동 확인 모달 */}
            {showExitModal && (
                <div className="fixed inset-0 z-[100]">
                    {/* Dim + blur */}
                    <div
                        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
                        onClick={() => setShowExitModal(false)}
                    />
                    {/* Icon badge */}
                    <div className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-full w-[9vh] h-[9vh] rounded-full bg-[#271257] border-4 border-white/85 flex items-center justify-center text-white text-[2rem] shadow-[0_0.6vh_1.6vh_rgba(0,0,0,0.4)]">
                        !
                    </div>
                    {/* Card */}
                    <div className="absolute left-1/2 top-[36%] -translate-x-1/2 w-[86%] max-w-[460px] rounded-[2.2vh] bg-white shadow-[0_1.4vh_3vh_rgba(0,0,0,0.45)] overflow-hidden">
                        <div className="px-[2.6vh] pt-[2.6vh] pb-[2vh] text-center">
                            <h3 className="font-ohsquare text-[#160449] text-[1.55rem] font-extrabold leading-tight">
                                테스트를
                                <br /> 종료하시겠어요?
                            </h3>
                            <p className="mt-[1.2vh] text-[1.02rem] text-black/60 leading-snug">
                                지금까지 입력한 내용이 사라지고
                                <br /> 메인 화면으로 돌아가요
                            </p>
                        </div>
                        <div className="grid grid-cols-2">
                            <button
                                onClick={() => setShowExitModal(false)}
                                className="py-[2vh] bg-[#F4F4F7] text-[#160449] font-semibold"
                            >
                                계속하기
                            </button>
                            <button
                                onClick={() => router.push("/")}
                                className="py-[2vh] bg-[#160449] text-white font-semibold"
                            >
                                종료하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
