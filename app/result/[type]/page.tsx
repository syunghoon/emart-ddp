"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ResultDetail from "./resultDetail";
import { resultData, ResultInfo } from "./resultData";

export default function ResultPage() {
    const [step, setStep] = useState<"card" | "detail">("card");
    const params = useParams();
    const type =
        typeof params?.type === "string"
            ? params.type
            : Array.isArray(params?.type)
            ? params.type[0]
            : undefined;
    const result: ResultInfo = (type && resultData[type]) ||
        // fallback: pick the first resultData entry or a default object
        Object.values(resultData)[0] || {
            title: "Unknown",
            description: "No result found.",
        };

    useEffect(() => {
        const timer = setTimeout(() => setStep("detail"), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="h-full">
            {/* {step === "card" && <ResultCard />} */}
            {step === "detail" && <ResultDetail result={result} />}
        </main>
    );
}
