import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create.dto';
import { UpdateCarDto } from './dto/update.dto';
import { PaginationQuery } from '@app/common';
import { Car } from '.prisma/client';

@Injectable()
export class CarsService {
  constructor(private readonly prismaSerice: PrismaService) {}

  async findMany(query: PaginationQuery): Promise<Car[]> {
    const { take = 10, skip = 0 } = query;

    return this.prismaSerice.car.findMany({
      orderBy: {
        id: 'desc',
      },
      take: Number(take),
      skip: Number(skip),
    });
  }

  async findOne(id: string): Promise<Car> {
    return this.prismaSerice.car.findUnique({
      where: {
        id,
      },
    });
  }

  async createOne(data: CreateCarDto): Promise<Car> {
    return this.prismaSerice.car.create({
      data,
    });
  }

  async updateOne(id: string, data: UpdateCarDto): Promise<Car> {
    return this.prismaSerice.car.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteOne(id: string): Promise<Car> {
    return this.prismaSerice.car.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
