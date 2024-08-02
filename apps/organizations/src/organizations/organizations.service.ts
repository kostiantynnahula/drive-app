import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from '.prisma/client';
import { SearchQuery } from './dto/search.query';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Find many organizations by query params
   *
   * @param {PaginationQuery} query
   * @returns {Promise<Organization[]>}
   */
  async findMany(query: SearchQuery): Promise<Organization[]> {
    const {
      skip = 0,
      take = 10,
      country,
      city,
      priceFrom,
      priceTo,
      lessonTypes,
    } = query;

    return await this.prismaService.organization.findMany({
      where: {
        deletedAt: null,
        locations: {
          some: {
            country,
            city,
          },
        },
        lessonsOptions: {
          some: {
            price: {
              gte: priceFrom,
              lte: priceTo,
            },
            lessonType: {
              in: lessonTypes,
            },
          },
        },
      },
      include: {
        lessonsOptions: {
          select: {
            id: true,
            name: true,
            lessonType: true,
            price: true,
          },
        },
      },
      take,
      skip,
    });
  }

  /**
   * Find one organization by id
   *
   * @param {string} id
   * @returns {Promise<Organization>}
   */
  async findOne(id: string): Promise<Organization> {
    return await this.prismaService.organization.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        locations: true,
        lessonsOptions: true,
      },
    });
  }

  /**
   * Create organization by passed data
   *
   * @param {CreateOrganizationDto} data
   * @returns {Promise<Organization>}
   */
  async createOne(
    data: CreateOrganizationDto,
    ownerId: string,
  ): Promise<Organization> {
    return await this.prismaService.organization.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        description: data.description,
        ownerId,
        lessonsOptions: {
          create: data.lessonsOptions,
        },
      },
    });
  }

  /**
   * Update organziation by id
   *
   * @param {string} id
   * @param {UpdateOrganizationDto} data
   * @returns {Promise<Organization>}
   */
  async updateOne(
    id: string,
    data: Omit<UpdateOrganizationDto, 'lessonsOptions'>,
  ): Promise<Organization> {
    return await this.prismaService.organization.update({
      where: { id },
      data,
    });
  }

  /**
   * Mark organization as deleted
   *
   * @param {Organization} organization
   * @returns {Promise<Organization>}
   */
  async deleteOne(organization: Organization): Promise<Organization> {
    const time = new Date().getTime();
    const { name, email, phone } = organization;

    return await this.prismaService.organization.update({
      where: { id: organization.id },
      data: {
        deletedAt: new Date(),
        name: `${name}-${time}`,
        email: `${email}-${time}`,
        phone: `${phone}-${time}`,
      },
    });
  }
}
