import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Photo } from '.prisma/client';
import { CreateManyPhotos } from './intrefaces/photo.interface';

@Injectable()
export class PhotosService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Find one photo
   * @param {string} carId
   * @param {string} id
   * @returns {Promise<Photo>}
   */
  async findOne(carId: string, id: string): Promise<Photo> {
    return await this.prismaService.photo.findUnique({
      where: {
        id,
        carId,
      },
    });
  }

  /**
   * Find many photos
   * @param {string} carId
   * @param {string[]} ids
   * @returns {Promise<Photo[]>}
   */
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

  /**
   * Create many photos
   * @param {CreateManyPhotos[]} data
   * @returns {Promise<void>}
   */
  async createMany(data: CreateManyPhotos[]): Promise<void> {
    await this.prismaService.photo.createMany({
      data,
    });
  }

  /**
   * Delete one photo
   * @param {string} carId
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteMany(carId: string, photoId: string): Promise<void> {
    await this.prismaService.photo.deleteMany({
      where: {
        carId,
        id: photoId,
      },
    });
  }
}
