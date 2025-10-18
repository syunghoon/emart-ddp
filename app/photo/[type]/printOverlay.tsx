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

    const framePath = `/frame-${params.type}.png`;

    return (
        <div className="print-only flex flex-col justify-center w-full bg-white pt-[5%] px-[2.5%] pb-[15%]">
            <img src={topOverlayPath} />
            <div className="print-overlay-wrapper">
                <img
                    src={imageUrl}
                    alt="photo"
                    className="print-overlay-photo"
                />
                <img
                    src={framePath}
                    alt="frame"
                    className="print-overlay-frame"
                />
            </div>

            <div className="flex items-center justify-between">
                <img src={bottomOverlayPath} alt="" className="w-[65%]" />
                {/* QR 코드 출력 */}
                {qrUrl && (
                    <div className="flex w-[30%] justify-end">
                        <QRCodeCanvas value={qrUrl} size={82} />
                    </div>
                )}
            </div>
        </div>
    );
}
