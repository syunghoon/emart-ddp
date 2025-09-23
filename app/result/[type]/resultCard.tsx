import { ResultInfo } from "./resultData";

type ResultDetailProps = {
    result: ResultInfo;
};

const ResultCard: React.FC<ResultDetailProps> = ({ result }) => {
    return (
        <div
            className="relative flex flex-col items-center w-full min-h-screen
            bg-gradient-to-b from-[#150348] to-[#3308AE] text-white"
        >
            {/* Top header */}
            <div className="relative w-full flex flex-col items-center mt-[6vh]">
                <div className="flex flex-col items-center">
                    <div className="px-[1.5vh] py-[0.6vh] bg-white/20 rounded-[0.9vh]">
                        <p className="font-pretendard text-[2.1vh] leading-1.4">
                            내 디저트 취향은?
                        </p>
                    </div>
                    <img src="/bubble-poly.svg" className="w-[1.5vh]" alt="" />
                </div>
                <p
                    className="font-ohsquare text-[8.1vh] leading-1.1 text-transparent bg-clip-text bg-gradient-to-b"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${result.titleGradient[0]}, ${result.titleGradient[1]})`,
                    }}
                >
                    {result.title}
                </p>
            </div>

            <div
                className="absolute top-[38%] w-full h-[20vh] bg-white/20"
                style={{ backgroundColor: `${result.brandColor}` }}
            ></div>

            <img
                className="h-[45vh] z-10 absolute top-[50%] left-[50%] rounded-[2.4vh] outline-[0.3vh]
                shadow-[0_0.66vh_5.3vh_0_rgba(21,3,72,0.30)]
                -translate-x-1/2 -translate-y-1/2"
                src={result.titleCardUrl}
                alt={result.title}
            />
        </div>
    );
};

export default ResultCard;
