import type { Video } from "../types/video";
import { FeaturedVideo } from "./FeaturedVideo";
import { VideoCard } from "./VideoCard";

interface Props {
    videos: Video[];
}

export const VideoGrid = ({ videos }: Props) => {
    const sortedVideos = [...videos].sort((a, b) => b.hypeLevel - a.hypeLevel);
    const topVideo = sortedVideos[0];
    const restVideos = sortedVideos.slice(1);

    return (
        <div>

            {topVideo && <FeaturedVideo video={topVideo} />}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-3">
                {restVideos.map((video, index) => (
                    <VideoCard key={index} video={video} />
                ))}
            </div>
        </div>
    );
};
