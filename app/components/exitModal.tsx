"use client";

import React from "react";

interface ExitModalProps {
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ExitModal({ onCancel, onConfirm }: ExitModalProps) {
    return (
        <div>
            {/* Dim + blur */}
            <div
                className="kiosk-canvas absolute inset-0 bg-black/55 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Card */}
            <div className="absolute w-[36vh] left-1/2 top-[25%] -translate-x-1/2 px-[1.2vh] pt-[1.2vh] pb-[3vh] rounded-[2.2vh] bg-white overflow-hidden">
                <div className="flex flex-col items-center px-[2.6vh] pt-[2.6vh] pb-[2vh] mb-[2.8vh] text-center">
                    <img
                        className="w-[6vh] h-[6vh] mb-[1.8vh]"
                        src="/warning_rendered.png"
                    />
                    <h3 className="font-ohsquare text-[#160449] text-[3vh] leading-1.3">
                        테스트를
                        <br /> 종료하시겠어요?
                    </h3>
                    <p className="font-pretendard mt-[1.2vh] text-[2vh] text-[#63666A] leading-1.4">
                        지금까지 진행한 내용이 사라지고
                        <br /> 메인 화면으로 돌아가요
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-[1vh]">
                    <button
                        onClick={onCancel}
                        className="rounded-[1.2vh] whitespace-nowrap px-[4vh] py-[1.8vh] text-[2.4vh] bg-[#F4F4F7] text-[#160449] font-pretendard font-semibold"
                    >
                        계속하기
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-[1.2vh] whitespace-nowrap px-[4vh] py-[1.8vh] text-[2.4vh] bg-[#160449] text-[#F4F4F7] font-pretendard font-semibold"
                    >
                        종료하기
                    </button>
                </div>
            </div>
        </div>
    );
}
