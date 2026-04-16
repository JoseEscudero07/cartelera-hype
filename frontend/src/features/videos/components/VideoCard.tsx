import { useState } from "react";
import type { Video } from "../types/video";

interface Props {
    video: Video;
}

export const VideoCard = ({ video }: Props) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">

            {!imgError ? (
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    onError={() => setImgError(true)}
                    className="w-full h-[200px] object-cover"
                />
            ) : (
                <div className="w-full h-[200px] bg-gray-700 flex items-center justify-center">
                    <span className="text-xs text-gray-300 text-center px-2">
                        300x200
                    </span>
                </div>
            )}

            <div className="p-3 text-left">
                <h3 className="text-sm font-semibold">{video.title}</h3>
                <p className="text-xs text-gray-400">{video.author}</p>
                <p className="text-xs text-gray-500">{video.publishedAt}</p>
            </div>
        </div>
    );
};