import { Test, TestingModule } from '@nestjs/testing';
import { PhotosController } from './photos.controller';
import { PrismaModule } from './../prisma/prisma.module';
import { CarsService } from '../cars/cars.service';
import { PhotosService } from './photos.service';

describe('PhotosController', () => {
  let controller: PhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [PhotosController],
      providers: [PhotosService, CarsService],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
