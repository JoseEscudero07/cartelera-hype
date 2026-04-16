import { Header } from "../shared/components/Header";
import { useVideos } from "../features/videos/hooks/useVideos";
import { VideoGrid } from "../features/videos/components/VideoGrid";

export const Home = () => {
    const { videos, loading, error } = useVideos();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div  className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                    <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                </div>
            </div>
        )   
    }

    if (error) {
        return (
            <div className="p-4 mb-4 text-sm" >
                <span className="font-medium ml-2">error alert!</span> {error}
            </div>
        )
    }

    return (
        <div className="w-full">
            <Header />

            <div className="max-w-screen  bg-gray-900">
                <VideoGrid videos={videos} />
            </div>
        </div>
    );
};