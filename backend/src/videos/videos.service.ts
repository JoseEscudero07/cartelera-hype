import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { VideoEntity } from './entities/video.entity';
import { VideoResponseDto } from './dto/video-response.dto';
import { getRelativeTime } from '../utils/relative-time.util';
import { YoutubeVideo } from './interfaces/youtube-video.interface';
@Injectable()
export class VideosService {
  getVideos(): VideoResponseDto[] {
    const rawVideos = this.loadVideos();

    const videos = rawVideos.map((video) => {
      const entity = this.toEntity(video);

      const hype = this.calculateHype(entity);

      return {
        title: entity.title,
        author: entity.author,
        thumbnail: entity.thumbnail,
        publishedAt: getRelativeTime(entity.publishedAt),
        hypeLevel: hype,
      };
    });

    return videos.sort((a, b) => b.hypeLevel - a.hypeLevel);
  }

  private loadVideos(): YoutubeVideo[] {
    try {
      const filePath = path.join(
        process.cwd(),
        'src/data/mock-youtube-api.json',
      );

      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);

      return  parsed.items;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error cargando los videos desde el archivo JSON',
      );  
    }
  }

  private toEntity(video: YoutubeVideo): VideoEntity {
    return {
      title: video.snippet.title,
      author: video.snippet.channelTitle,
      publishedAt: new Date(video.snippet.publishedAt),
      likes: Number(video.statistics.likeCount),
      thumbnail: video.snippet.thumbnails?.high?.url,
      views: Number(video.statistics.viewCount),
      comments: Number(video.statistics.commentCount || 0),
    };
  }

  private calculateHype(video: VideoEntity): number {
    if (!video.comments) return 0;

    let hype = (video.likes + video.comments) / video.views;

    if (video.title.toLowerCase().includes('tutorial')) {
      hype *= 2;
    }

    return hype;
  }
}