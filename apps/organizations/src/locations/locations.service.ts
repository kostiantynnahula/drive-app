import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create.dto';
import { UpdateLocationDto } from './dto/update.dto';
import { Location } from '.prisma/client';
import { SearchQuery } from './dto/saerch.query';

@Injectable()
export class LocationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(
    organizationId: string,
    query: SearchQuery,
  ): Promise<Location[]> {
    const { skip = 0, take = 10, country, city, ids } = query;
    return await this.prismaService.location.findMany({
      where: {
        organizationId,
        country,
        city,
        deletedAt: null,
        id: {
          in: ids,
        },
      },
      take: take,
      skip: skip,
    });
  }

  async findOne(organizationId: string, id: string): Promise<Location> {
    return await this.prismaService.location.findFirst({
      where: {
        id,
        organizationId,
        deletedAt: null,
      },
    });
  }

  async createOne(
    organizationId: string,
    data: CreateLocationDto,
  ): Promise<Location> {
    return await this.prismaService.location.create({
      data: { ...data, organizationId },
    });
  }

  async updateOne(
    organizationId: string,
    id: string,
    data: UpdateLocationDto,
  ): Promise<Location> {
    return await this.prismaService.location.update({
      where: { id, organizationId },
      data,
    });
  }

  async deleteOne(organizationId: string, id: string): Promise<Location> {
    return await this.prismaService.location.update({
      where: { id, organizationId },
      data: { deletedAt: new Date() },
    });
  }
}
