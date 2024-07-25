import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @Post('upload/:id/logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: any,
  ) {
    // TODO: Check is organization exists
    const logo = await this.service.upload(file.originalname, file.buffer);
    return await this.service.updateOrganizationLogo(id, logo);
  }
}
