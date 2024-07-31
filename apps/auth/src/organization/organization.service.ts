import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(organizationId: string): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { organizationId },
    });
  }

  async findOne(id: string, organizationId: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { id, organizationId },
    });
  }

  async addToOrganization(id: string, organizationId: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { organizationId },
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
