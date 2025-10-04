import { supabase } from "@/lib/supabaseClient";

function dataURLtoBlob(dataUrl: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

export async function uploadPhoto(base64: string) {
    const fileBlob = dataURLtoBlob(base64);
    const fileName = `${crypto.randomUUID()}.png`;

    const { data, error } = await supabase.storage
        .from("photos") // ← 방금 만든 버킷 이름
        .upload(`public/${fileName}`, fileBlob, {
            contentType: "image/png",
        });

    if (error) {
        console.error("Upload error:", error.message);
        return null;
    }

    // 퍼블릭 버킷이면 getPublicUrl 사용
    const { data: publicData } = supabase.storage
        .from("photos")
        .getPublicUrl(`public/${fileName}`);

    return publicData.publicUrl;
}
