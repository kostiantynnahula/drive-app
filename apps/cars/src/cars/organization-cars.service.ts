import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create.dto';
import { UpdateCarDto } from './dto/update.dto';
import { Car } from '.prisma/client';

@Injectable()
export class OrganizationCarsService {
  constructor(private readonly prismaSerice: PrismaService) {}

  async findMany(organizationId: string): Promise<Car[]> {
    return this.prismaSerice.car.findMany({
      where: {
        organizationId,
        deletedAt: null,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: string, organizationId: string): Promise<Car> {
    return this.prismaSerice.car.findFirst({
      where: {
        id,
        organizationId,
        deletedAt: null,
      },
      include: {
        photos: true,
      },
    });
  }

  async createOne(data: CreateCarDto): Promise<Car> {
    return this.prismaSerice.car.create({
      data,
    });
  }

  async updateOne(
    id: string,
    organizationId: string,
    data: UpdateCarDto,
  ): Promise<Car> {
    return this.prismaSerice.car.update({
      where: {
        id,
        organizationId,
        deletedAt: null,
      },
      data,
    });
  }

  async deleteOne(id: string, organizationId): Promise<Car> {
    return this.prismaSerice.car.update({
      where: {
        id,
        organizationId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
