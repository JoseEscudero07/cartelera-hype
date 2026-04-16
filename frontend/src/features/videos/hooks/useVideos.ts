import { useEffect, useState } from "react";
import { getVideos } from "../services/videoService";
import type { Video } from "../types/video";
import { logger } from "../../../shared/utils/logger";

export const useVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);

                const data = await getVideos();

                setVideos(data);
                setError(null);
            } catch (err) {
                logger.error("Error obteniendo videos", err);
                setError("No se pudieron cargar los videos");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return { videos, loading, error };
};
