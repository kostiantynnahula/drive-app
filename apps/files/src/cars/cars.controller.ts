import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './file-validation.pipe';
import { File } from '@app/common';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Post('upload/:id/picture')
  @UsePipes(
    new FileValidationPipe({
      fieldName: 'files',
      maxCount: 5,
      totalSize: 1024 * 1024 * 5,
    }),
  )
  @UseInterceptors(FilesInterceptor('files'))
  async uploadPicture(@Param('id') id: string, @UploadedFiles() files: File[]) {
    return await this.service.uploadPhotos(files);
  }
}
