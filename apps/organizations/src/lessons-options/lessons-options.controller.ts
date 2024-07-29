import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LessonsOptionsService } from './lessons-options.service';
import { CreateLessonOptionDto } from './dto/create-lesson-option.dto';

@Controller('lessons-options')
export class LessonsOptionsController {
  constructor(private readonly service: LessonsOptionsService) {}

  @Get(':organizationId')
  async findMany(@Param('organizationId') organizationId: string) {
    return await this.service.findManyByOrganization(organizationId);
  }

  @Get(':organizationId/:optionId')
  async findOne(
    @Param('organizationId') organizationId: string,
    @Param('optionId') optionId: string,
  ) {
    return await this.service.findOneByOrganization(organizationId, optionId);
  }

  @Post(':organizationId')
  async createOne(
    @Param('organizationId') organizationId: string,
    @Body() body: CreateLessonOptionDto,
  ) {
    const option = await this.service.findOneByOrganizationAndType(
      organizationId,
      body.lessonType,
    );

    if (option) {
      throw new BadRequestException('Option already exists');
    }

    return await this.service.createOneByOrganization(organizationId, body);
  }

  @Patch(':organizationId/:optionId')
  async updateOne(
    @Param('organizationId') organizationId: string,
    @Param('optionId') optionId: string,
    @Body() body: CreateLessonOptionDto,
  ) {
    return await this.service.updateOneByOrganization(
      organizationId,
      optionId,
      body,
    );
  }

  @Delete(':organizationId/:optionId')
  async deleteOne(
    @Param('organizationId') organizationId: string,
    @Param('optionId') optionId: string,
  ) {
    return await this.service.deleteOneByOrganization(organizationId, optionId);
  }
}
