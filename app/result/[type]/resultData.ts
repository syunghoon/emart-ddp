export type Dessert = {
    name: string;
    imageUrl: string;
};

export type ResultImage = {
    imageUrl: string;
    size: string;
};

export type ResultInfo = {
    id: number;
    title: string;
    titleGradient: [string, string];
    titleCardUrl: string;
    brandColor: string;
    descriptionTitle: string;
    description: string;
    desserts: Dessert[];
    dessertGradient: [string, string, string];
    images: ResultImage[];
};

export const resultData: Record<string, ResultInfo> = {
    1: {
        id: 1,
        title: "미식고집",
        titleGradient: ["#FFFFFF", "#FFAE8C"],
        titleCardUrl: "/results/misik-card.png",
        brandColor: "#FF4D50",
        descriptionTitle: "피코크",
        description:
            "디저트에 진심이며, 맛의 정점을 찍는 최고의 디저트만을 고집한다.\n이마트의 피코크 브랜드 디저트라면 인정한다고 한다.",
        desserts: [
            {
                name: "체스트넛\n소보루바크씬",
                imageUrl: "/results/misik-dessert-1.png",
            },
            {
                name: "밀크헤이즐넛\n모카바크씬",
                imageUrl: "/results/misik-dessert-2.png",
            },
            {
                name: "다크초코프렌치\n버터비스킷",
                imageUrl: "/results/misik-dessert-3.png",
            },
            {
                name: "마일드초코프렌치\n버터비스킷",
                imageUrl: "/results/misik-dessert-4.png",
            },
            {
                name: "더블초코쿠키바",
                imageUrl: "/results/misik-dessert-5.png",
            },
            {
                name: "쁘띠쇼콜라쿠키",
                imageUrl: "/results/misik-dessert-6.png",
            },
        ],
        dessertGradient: ["#FFD761", "#FF4D50", "#480303"],
        images: [
            { imageUrl: "/results/misik-left.png", size: "w-[13vh]" },
            { imageUrl: "/results/misik-right.png", size: "w-[30vh]" },
            { imageUrl: "/results/misik-character.png", size: "w-[30vh]" },
        ],
    },

    2: {
        id: 2,
        title: "마구와구",
        titleGradient: ["#FFFFFF", "#FFFC48"],
        titleCardUrl: "/results/magu-card.png",
        brandColor: "#FFBE20",
        descriptionTitle: "오케이프라이스",
        description:
            "디저트라면 뭐든 가리지 않고 와구와구 먹는다. 호기심이 많아 신상품에 관심이 있다.\n이마트에서 최근 새로 나온 브랜드 오케이프라이스의 과자들을 특히 좋아한다.",
        desserts: [
            {
                name: "꿀먹은 누룽지",
                imageUrl: "/results/magu-dessert-1.png",
            },
            {
                name: "바삭한 마칩",
                imageUrl: "/results/magu-dessert-2.png",
            },
            {
                name: "양념치킨맛 팝콘",
                imageUrl: "/results/magu-dessert-3.png",
            },
            {
                name: "양파칩",
                imageUrl: "/results/magu-dessert-4.png",
            },
            {
                name: "버터솔트팝콘",
                imageUrl: "/results/magu-dessert-5.png",
            },
            {
                name: "자색고구마볼",
                imageUrl: "/results/magu-dessert-6.png",
            },
        ],
        dessertGradient: ["#FFFC48", "#FFB81C", "#480C03"],
        images: [
            { imageUrl: "/results/magu-left.png", size: "w-[13vh]" },
            { imageUrl: "/results/magu-right.png", size: "w-[20vh]" },
            { imageUrl: "/results/magu-character.png", size: "w-[30vh]" },
        ],
    },
    3: {
        id: 3,
        title: "슴슴한입",
        titleGradient: ["#FFFFFF", "#61FFCE"],
        titleCardUrl: "/results/smsm-card.png",
        brandColor: "#20BBAC",
        descriptionTitle: "자연주의",
        description:
            "자극적인 맛 보다는 덜 달고 덜 짠 과자를 즐겨먹으며 소소한 행복을 충전한다.\n이마트의 자연주의 브랜드 과자가 딱이라고 한다.",
        desserts: [
            {
                name: "두부과자",
                imageUrl: "/results/smsm-dessert-1.png",
            },
            {
                name: "유기농 콘칩",
                imageUrl: "/results/smsm-dessert-2.png",
            },
            {
                name: "유기농 통밀퐁",
                imageUrl: "/results/smsm-dessert-3.png",
            },
            {
                name: "오리지널 통밀 크래커",
                imageUrl: "/results/smsm-dessert-4.png",
            },
            {
                name: "현미칩",
                imageUrl: "/results/smsm-dessert-5.png",
            },
            {
                name: "유기농 쌀 뻥튀기",
                imageUrl: "/results/smsm-dessert-6.png",
            },
        ],
        dessertGradient: ["#61FFCE", "#20BBAC", "#150348"],
        images: [
            { imageUrl: "/results/smsm-left.png", size: "w-[10vh]" },
            { imageUrl: "/results/smsm-right.png", size: "w-[25vh]" },
            { imageUrl: "/results/smsm-character.png", size: "w-[30vh]" },
        ],
    },
};
