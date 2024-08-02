import {
  Controller,
  Delete,
  Param,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { File } from '@app/common';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Post(':id/photo')
  @UsePipes(
    new FileValidationPipe({
      fieldName: 'files',
      maxCount: 5,
      totalSize: 1024 * 1024 * 5,
    }),
  )
  @UseInterceptors(FilesInterceptor('files'))
  async uploadPicture(@Param('id') id: string, @UploadedFiles() files: File[]) {
    const ulrs = await this.service.uploadPhoto(files);

    return await this.service.addCarPhoto(id, ulrs);
  }

  @Get(':id/photo')
  async findMany(@Param('id') id: string) {
    return await this.service.findCarPhotos(id);
  }

  @Get(':id/photo/:photoId')
  async findOne(@Param('id') id: string, @Param('photoId') photoId: string) {
    return await this.service.findCarPhoto(id, photoId);
  }

  @Delete(':id/photo/:photoId')
  async deleteOne(@Param('id') id: string, @Param('photoId') photoId: string) {
    const photo = await this.service.findCarPhoto(id, photoId);

    if (photo) {
      await this.service.deleteCarPhoto(id, photoId);
      return await this.service.delete(photo.url);
    }

    return null;
  }
}
