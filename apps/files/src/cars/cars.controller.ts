import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Post('upload/:id/picture')
  @UseInterceptors(FileInterceptor('files'))
  async uploadPicture(@Param('id') id: string, @UploadedFiles() files: any) {
    console.log(files, 'files');
  }
}
