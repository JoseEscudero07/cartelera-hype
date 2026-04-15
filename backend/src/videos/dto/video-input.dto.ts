import { IsString, IsNumber, IsOptional } from 'class-validator';

export class VideoInputDto {
  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsNumber()
  views!: number;

  @IsNumber()
  likes!: number;

  @IsOptional()
  @IsNumber()
  comments?: number;

  @IsString()
  publishedAt!: string;

  @IsString()
  thumbnail!: string;
}