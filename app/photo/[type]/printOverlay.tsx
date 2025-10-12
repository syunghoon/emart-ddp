"use client";

import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

interface PrintOverlayProps {
    imageUrl: string;
    qrUrl?: string | null; // null 허용
}

export default function PrintOverlay({ imageUrl, qrUrl }: PrintOverlayProps) {
    const params = useParams<{ type: string }>();
    const overlayType = params?.type;
    const topOverlayPath = `/print/top-${overlayType}.svg`;
    const bottomOverlayPath = `/print/bottom-left.svg`;

    return (
        <div className="print-only flex flex-col items-center justify-center w-full">
            <img src={topOverlayPath} />

            <img src={imageUrl} alt="photo" />

            <div className="flex justify-between w-full">
                <img src={bottomOverlayPath} alt="" className="w-[60%]" />
                {/* QR 코드 출력 */}
                {qrUrl && <QRCodeCanvas value={qrUrl} className="w-[40%]" />}
            </div>
        </div>
    );
}
