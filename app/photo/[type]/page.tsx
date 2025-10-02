"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { supabase } from "@/lib/supabaseClient";

import ExitModal from "@/app/components/exitModal";
import LoadModal from "@/app/components/loadModal";

import PrintOverlay from "./printOverlay";

function dataURLtoBlob(dataUrl: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]); // base64 → 바이너리 문자열

    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

export default function PhotoPage() {
    const webcamRef = useRef<Webcam>(null);

    const params = useParams<{ type: string }>();

    const router = useRouter();

    const [captured, setCaptured] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [preCountdown, setPreCountdown] = useState(10);
    const [showExitModal, setShowExitModal] = useState(false);
    const [showLoadModal, setShowLoadModal] = useState(false);

    // 프레임 경로 (예: /frame-1.png)
    const framePath = `/frame-${params.type}.png`;

    useEffect(() => {});

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
            //(3:4)으로 합성
            const width = 750;
            const height = 1000;
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

    // function save() {
    //     if (!captured) return;
    //     const a = document.createElement("a");
    //     a.href = captured;
    //     a.download = `${params.type}_photo.png`;
    //     a.click();
    // }

    async function printImage() {
        // 단순 페이지 인쇄 트리거. 필요 시 프린트 전용 오버레이로 확장 가능.
        setShowLoadModal(true);
        if (captured) {
            const fileBlob = dataURLtoBlob(captured);

            const fileName = `${crypto.randomUUID()}.png`;
            const { data, error } = await supabase.storage
                .from("photos")
                .upload(`captures/${fileName}`, fileBlob, {
                    contentType: "image/png",
                });

            console.log("uploaded:", data, error);
        }
        window.print();
        setTimeout(() => router.push("/"), 10000);
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
                                width: 750,
                                height: 1000,
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
                    <div className="no-print absolute top-[3.6vh] right-[3vh] z-10">
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
                    <div className="no-print relative aspect-[3/4] mt-[12vh] w-[90%]">
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
                    <footer className="no-print absolute bottom-0 left-0 w-full px-[7.2vh] mb-[6vh] bg-transparent">
                        <button
                            onClick={printImage}
                            className="text-[3.6vh] font-ohsquare w-full py-[1.4vh] leading-[1.28] rounded-full bg-white text-[#160449]"
                        >
                            사진 출력하기
                        </button>
                    </footer>
                    <PrintOverlay imageUrl={captured} />
                </>
            )}

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
                    <LoadModal type="printing" />
                </div>
            )}
        </main>
    );
}
