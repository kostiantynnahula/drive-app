import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LessonsOption, $Enums } from '.prisma/client';
import { CreateLessonOptionDto } from './dto/create-lesson-option.dto';

@Injectable()
export class LessonsOptionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByOrganization(
    organizationId: string,
  ): Promise<LessonsOption[]> {
    return await this.prismaService.lessonsOption.findMany({
      where: {
        organizationId,
      },
    });
  }

  async findOneByOrganization(
    organizationId: string,
    optionId: string,
  ): Promise<LessonsOption> {
    return await this.prismaService.lessonsOption.findFirst({
      where: {
        id: optionId,
        organizationId,
      },
    });
  }

  async createOneByOrganization(
    organizationId: string,
    data: CreateLessonOptionDto,
  ): Promise<LessonsOption> {
    return await this.prismaService.lessonsOption.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }

  async createManyByOrganization(
    organizationId: string,
    data: CreateLessonOptionDto[],
  ): Promise<{ count: number }> {
    const list = data.map((option) => ({ ...option, organizationId }));

    return await this.prismaService.lessonsOption.createMany({
      data: list,
    });
  }

  async updateOneByOrganization(
    organizationId: string,
    optionId: string,
    data: CreateLessonOptionDto,
  ): Promise<LessonsOption> {
    return await this.prismaService.lessonsOption.update({
      where: {
        id: optionId,
        organizationId,
      },
      data,
    });
  }

  async deleteOneByOrganization(
    organizationId: string,
    optionId: string,
  ): Promise<LessonsOption> {
    return await this.prismaService.lessonsOption.delete({
      where: {
        id: optionId,
        organizationId,
      },
    });
  }

  async findOneByOrganizationAndType(
    organizationId: string,
    lessonType: $Enums.LessonType,
  ) {
    return await this.prismaService.lessonsOption.findFirst({
      where: {
        organizationId,
        lessonType,
      },
    });
  }
}
