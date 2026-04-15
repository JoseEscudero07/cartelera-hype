export interface YoutubeVideo {
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: any;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount?: string;
  };
}