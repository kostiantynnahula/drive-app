import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PhotosController } from './photos.controller';
import { CarsService } from '../cars/cars.service';

@Module({
  imports: [PrismaModule],
  controllers: [PhotosController],
  providers: [PhotosService, CarsService],
  exports: [PhotosService],
})
export class PhotosModule {}
