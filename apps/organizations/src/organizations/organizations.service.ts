import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create.dto';
import { UpdateOrganizationDto } from './dto/update.dto';
import { Organization } from '.prisma/client';
import { PaginationQuery } from '@app/common';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(query: PaginationQuery): Promise<Organization[]> {
    const { skip = 0, take = 10 } = query;
    return await this.prismaService.organization.findMany({
      where: { deletedAt: null },
      take,
      skip,
    });
  }

  async findOne(id: string): Promise<Organization> {
    return await this.prismaService.organization.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async createOne(data: CreateOrganizationDto): Promise<Organization> {
    return await this.prismaService.organization.create({ data });
  }

  async updateOne(
    id: string,
    data: UpdateOrganizationDto,
  ): Promise<Organization> {
    return await this.prismaService.organization.update({
      where: { id },
      data,
    });
  }

  async deleteOne(id: string): Promise<Organization> {
    return await this.prismaService.organization.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
