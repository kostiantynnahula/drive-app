import { Test, TestingModule } from '@nestjs/testing';
import { LessonsOptionsService } from './lessons-options.service';

describe('LessonsOptionsService', () => {
  let service: LessonsOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonsOptionsService],
    }).compile();

    service = module.get<LessonsOptionsService>(LessonsOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
