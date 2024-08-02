import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create.dto';
import { UpdateCarDto } from './dto/update.dto';
import { Car } from '.prisma/client';
import { OrganizationCarsDto } from './dto/organization-cars.dto';

@Injectable()
export class OrganizationCarsService {
  constructor(private readonly prismaSerice: PrismaService) {}

  /**
   * Find many cars by organization
   * @param {OrganizationCarsDto} param
   * @returns {Promise<Car[]>}
   */
  async findMany({
    organizationId,
    locationId,
    transmission,
    owners,
  }: OrganizationCarsDto): Promise<Car[]> {
    return this.prismaSerice.car.findMany({
      where: {
        organizationId,
        locationId,
        transmission,
        ownerId: {
          in: owners,
        },
        deletedAt: null,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  /**
   * Find one car by organization
   * @param {string} id
   * @param {string} organizationId
   * @returns {Promise<Car>}
   */
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

  /**
   * Find one car by owner
   *
   * @param {string} organizationId
   * @param {string} ownerI
   * @returns {Promise<Car>}
   */
  async findOneByOwner(organizationId: string, ownerId: string): Promise<Car> {
    return await this.prismaSerice.car.findFirst({
      where: {
        organizationId,
        ownerId,
        deletedAt: null,
      },
    });
  }

  /**
   * Create one car
   *
   * @param {CreateCarDto} data
   * @returns {Promise<Car>}
   */
  async createOne(data: CreateCarDto): Promise<Car> {
    return this.prismaSerice.car.create({
      data,
    });
  }

  /**
   * Update one car
   * @param {string} id
   * @param {string} organizationId
   * @param {UpdateCarDto} data
   * @returns {Promise<Car>}
   */
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

  /**
   * Delete one car
   *
   * @param {string} id
   * @param {string} organizationId
   * @returns {Promise<Car>}
   */
  async deleteOne(id: string, organizationId: string): Promise<Car> {
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
