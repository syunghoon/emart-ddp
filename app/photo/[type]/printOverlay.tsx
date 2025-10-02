"use client";

interface PrintOverlayProps {
    imageUrl: string;
    qrUrl?: string;
}

export default function PrintOverlay({ imageUrl, qrUrl }: PrintOverlayProps) {
    console.log("PRINTED");
    return (
        <div className="print-only flex flex-col items-center justify-start">
            <img src="/test/test_result_top.svg" alt="" />
            <img src={imageUrl} alt="photo" />
            <img src="/test/test_result_bottom.svg" alt="" />
            {/* 촬영된 사진 */}

            {/* QR 코드 (옵션) */}
            {/* {qrUrl && <img src={qrUrl} alt="QR" className="w-[20%] mt-[2vh]" />} */}
        </div>
    );
}
