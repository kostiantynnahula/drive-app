import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { OrganizationDto } from './dto/organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find users by organization
   * @param {OrganizationDto}
   * @returns {Promise<User[]>}
   */
  async findMany({
    organizationId,
    locationId,
    role,
  }: OrganizationDto): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { organizationId, locationId, role },
    });
  }

  /**
   * Find user by organization
   *
   * @param {string} id
   * @param {string} organizationId
   * @returns {Promise<User>}
   */
  async findOne(id: string, organizationId: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { id, organizationId },
    });
  }

  /**
   * Add user to organization
   *
   * @param {string} id
   * @param {string} locationId
   * @param {string} organizationId
   * @returns {Promise<User>}
   */
  async addToOrganization(
    id: string,
    locationId: string,
    organizationId: string,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { organizationId, locationId },
    });
  }

  /**
   * Remove user from organziation
   *
   * @param {string} id
   * @param {string} organizationId
   * @returns {Promise<User>}
   */
  async removeFromOrganization(
    id: string,
    organizationId: string,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id, organizationId },
      data: { organizationId: null },
    });
  }
}
