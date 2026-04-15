
export class VideoEntity {
  title!: string;
  author!: string;
  views!: number;
  likes!: number;
  comments?: number;
  publishedAt!: Date;
  thumbnail!: string;
  hypeLevel?: number;
}