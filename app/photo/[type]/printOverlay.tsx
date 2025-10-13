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
        <div className="print-only flex items-center justify-center w-full bg-white p-6">
            <div className="relative w-full max-w-[2.8in] aspect-[3/4] overflow-hidden">
                <img
                    src={imageUrl}
                    alt="photo"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <img
                    src={topOverlayPath}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4">
                    <img src={bottomOverlayPath} alt="" className="w-[65%]" />
                    {qrUrl && (
                        <div className="rounded bg-white p-2">
                            <QRCodeCanvas value={qrUrl} size={120} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
