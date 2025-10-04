"use client";

import { QRCodeCanvas } from "qrcode.react";

interface PrintOverlayProps {
    imageUrl: string;
    qrUrl?: string | null; // null 허용
}

export default function PrintOverlay({ imageUrl, qrUrl }: PrintOverlayProps) {
    return (
        <div className="print-only flex flex-col items-center justify-center w-full">
            <img src="/test/test_result_top.svg" alt="" />

            {/* 사진 출력 */}
            <img src={imageUrl} alt="photo" />
            <div className="flex justify-between">
                <img src="/test/test_result_bottom.svg" alt="" />

                {/* QR 코드 출력 */}
                {qrUrl && <QRCodeCanvas value={qrUrl} className="w-30%" />}
            </div>
        </div>
    );
}
