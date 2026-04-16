import type { Video } from "../types/video";


export const getVideos = async (): Promise<Video[]> => {
  try {
    const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const res = await fetch(`${BASE_API_URL}/api/videos`);
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    throw new Error("No se pudieron obtener los videos");
  }
};