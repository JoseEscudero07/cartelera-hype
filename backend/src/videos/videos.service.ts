import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideosService {
  getVideos() {
    const filePath = path.join(__dirname, '../data/mock-youtube-api.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    return data.items;
  }
}