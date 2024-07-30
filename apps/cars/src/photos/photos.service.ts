import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Photo } from '.prisma/client';
import { CreateManyPhotos } from './intrefaces/photo.interface';

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

  async findMany(carId: string, ids?: string[]): Promise<Photo[]> {
    return await this.prismaService.photo.findMany({
      where: {
        carId,
        id: {
          in: ids,
        },
      },
    });
  }

  async createMany(data: CreateManyPhotos[]): Promise<void> {
    await this.prismaService.photo.createMany({
      data,
    });
  }

  async deleteMany(carId: string, photoId: string): Promise<void> {
    await this.prismaService.photo.deleteMany({
      where: {
        carId,
        id: photoId,
      },
    });
  }
}
