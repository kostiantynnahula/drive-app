import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create.dto';
import { PaginationQuery } from '@app/common';
import { UpdateLocationDto } from './dto/update.dto';
import { Location } from '.prisma/client';

@Injectable()
export class LocationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(query: PaginationQuery): Promise<Location[]> {
    const { skip = 0, take = 10 } = query;
    return await this.prismaService.location.findMany({
      where: { deletedAt: null },
      take: take,
      skip: skip,
    });
  }

  async findOne(id: string): Promise<Location> {
    return await this.prismaService.location.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async createOne(data: CreateLocationDto): Promise<Location> {
    return await this.prismaService.location.create({ data });
  }

  async updateOne(id: string, data: UpdateLocationDto): Promise<Location> {
    return await this.prismaService.location.update({
      where: { id },
      data,
    });
  }

  async deleteOne(id: string): Promise<Location> {
    return await this.prismaService.location.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
