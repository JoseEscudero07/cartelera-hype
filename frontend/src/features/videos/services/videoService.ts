import type { Video } from "../types/video";


export const getVideos = async (): Promise<Video[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const res = await fetch("http://localhost:3000/api/videos");
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    throw new Error("No se pudieron obtener los videos");
  }
};