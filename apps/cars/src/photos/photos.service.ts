import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhotoDto } from './dto/create.dto';
import { Photo } from '.prisma/client';

@Injectable()
export class PhotosService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(carId: string, id: string): Promise<Photo> {
    return await this.prismaService.photo.findUnique({
      where: {
        id,
        carId,
      },
    });
  }

  async findMany(carId: string): Promise<Photo[]> {
    return await this.prismaService.photo.findMany({
      where: {
        carId,
      },
    });
  }

  async createOne(data: CreatePhotoDto): Promise<Photo> {
    return await this.prismaService.photo.create({
      data,
    });
  }

  async deleteOne(carId: string, id: string): Promise<Photo> {
    return await this.prismaService.photo.delete({
      where: {
        id,
        carId,
      },
    });
  }
}
