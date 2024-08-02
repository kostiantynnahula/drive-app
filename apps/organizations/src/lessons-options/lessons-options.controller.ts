import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LessonsOptionsService } from './lessons-options.service';
import { CreateLessonOptionDto } from './dto/create-lesson-option.dto';
import { CurrentUser, JwtAuthGuard, User } from '@app/common';

@UseGuards(JwtAuthGuard)
@Controller('lessons-options')
export class LessonsOptionsController {
  constructor(private readonly service: LessonsOptionsService) {}

  @Get()
  async findMany(@CurrentUser() user: User) {
    return await this.service.findManyByOrganization(user.organizationId);
  }

  @Get(':optionId')
  async findOne(
    @CurrentUser() user: User,
    @Param('optionId') optionId: string,
  ) {
    return await this.service.findOneByOrganization(
      user.organizationId,
      optionId,
    );
  }

  @Post()
  async createOne(
    @CurrentUser() user: User,
    @Body() body: CreateLessonOptionDto,
  ) {
    const option = await this.service.findOneByOrganizationAndType(
      user.organizationId,
      body.lessonType,
    );

    if (option) {
      throw new BadRequestException('Option already exists');
    }

    return await this.service.createOneByOrganization(
      user.organizationId,
      body,
    );
  }

  @Patch(':optionId')
  async updateOne(
    @CurrentUser() user: User,
    @Param('optionId') optionId: string,
    @Body() body: CreateLessonOptionDto,
  ) {
    return await this.service.updateOneByOrganization(
      user.organizationId,
      optionId,
      body,
    );
  }

  @Delete(':optionId')
  async deleteOne(
    @CurrentUser() user: User,
    @Param('optionId') optionId: string,
  ) {
    return await this.service.deleteOneByOrganization(
      user.organizationId,
      optionId,
    );
  }
}
