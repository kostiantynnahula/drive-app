import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { OrganizationDto } from './dto/organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany({
    organizationId,
    locationId,
    role,
  }: OrganizationDto): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { organizationId, locationId, role },
    });
  }

  async findOne(id: string, organizationId: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { id, organizationId },
    });
  }

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
