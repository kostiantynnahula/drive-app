import { Test, TestingModule } from '@nestjs/testing';
import { LessonsOptionsController } from './lessons-options.controller';

describe('LessonsOptionsController', () => {
  let controller: LessonsOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsOptionsController],
    }).compile();

    controller = module.get<LessonsOptionsController>(LessonsOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
