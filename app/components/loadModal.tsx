const titleText = {
    loading: {
        title: "맛취향 탐색 중",
        description: "미지의 세계에서 나의\n맛취향을 찾는 중이에요",
    },
    printing: {
        title: "사진 출력 중",
        description: "15-20초 정도 소요됩니다\n잠시만 기다려주세요",
    },
};

type TitleKey = keyof typeof titleText;

interface LoadModalProps {
    type: TitleKey; // key만 넘겨받음
}

export default function LoadModal({ type }: LoadModalProps) {
    const { title, description } = titleText[type];

    return (
        <div
            className="kiosk-canvas absolute inset-0 flex flex-col items-center w-full h-full 
            bg-[#160449] bg-[url('/modal-bg.svg')] bg-no-repeat bg-center bg-cover 
            pt-[31vh] gap-[3vh] text-white text-center"
        >
            <p className="font-ohsquare text-[4.2vh] leading-1.4">{title}</p>
            <img
                className="h-[10.2vh]"
                src="/modal-character.png"
                alt="캐릭터"
            />
            <p className="whitespace-pre-line font-pretendard text-[2.4vh] leading-1.4">
                {description}
            </p>
        </div>
    );
}
