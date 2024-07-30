import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PhotosService],
  exports: [PhotosService],
})
export class PhotosModule {}
