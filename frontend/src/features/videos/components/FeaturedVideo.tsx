import { useState } from "react";
import type { Video } from "../types/video";
import coronaLogo from "../../../assets/iconos/svg/corona.svg";

interface Props {
    video: Video;
}

export const FeaturedVideo = ({ video }: Props) => {
    const [imgError, setImgError] = useState(false)


    return (
        <div className="mb-8 overflow-hidden  p-2">


            {!imgError ? (
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    onError={() => setImgError(true)}
                    className="w-full h-[300px] object-cover shadow-lg"
                />
            ) : (
                <div className="w-full shadow-lg h-[300px] bg-gray-700 flex items-center justify-center">
                    <span className="text-xs text-gray-300 text-center px-2">
                        300x300
                    </span>
                </div>
            )}



            <div className="p-4 bg-gray-950 text-left rounded-br-xl rounded-bl-xl  shadow-lg">
                <h2 className="text-xl font-bold text-white mb-2">
                    <div className="flex items-center">
                        <img
                            src={coronaLogo}
                            alt="joya-corona"
                            className="mr-2 h-6 sm:h-9"
                        />
                        <span className="mt-3 items-center">
                            {video.title}
                        </span>
                    </div>
                    
                </h2>

                <p className="text-sm text-gray-400">{video.author}</p>
                <p className="text-xs text-gray-500">{video.publishedAt}</p>

                <p className="mt-2 text-purple-400 text-sm">
                    Hype: {video.hypeLevel.toFixed(2)}
                </p>
            </div>
        </div>
    );
};