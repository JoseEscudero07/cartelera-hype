import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosService],
    }).compile();

    service = module.get<VideosService>(VideosService);
  });

  it('debería retornar videos ordenados por hype descendente', async () => {
    const result = await service.getVideos();

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].hypeLevel).toBeGreaterThanOrEqual(
        result[i + 1].hypeLevel,
      );
    }
  });


  it('debería calcular correctamente el hype cuando el título contiene "tuTorial"', () => {
    const mockVideo = {
      title: 'react tuTorial',
      views: 100,
      likes: 50,
      comments: 50,
    };

    const hype = service['calculateHype'](mockVideo as any);

    // (50 + 50) / 100 = 1 → *2 = 2
    expect(hype).toBe(2);
  });

});