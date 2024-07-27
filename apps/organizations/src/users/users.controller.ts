import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { OrganizationsService } from '../organizations/organizations.service';

@Controller('organization')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Get(':organizationId/users')
  async findAll(@Param('organizationId') organizationId: string) {
    const organization =
      await this.organizationsService.findOne(organizationId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.service.findAll(organizationId);
  }

  @Get(':organizationId/users/:userId')
  async findOne(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
  ) {
    const organization =
      await this.organizationsService.findOne(organizationId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.service.findOne(userId, organizationId);
  }

  @Post(':organizationId/users/:userId')
  async addUserToOrganization(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
  ) {
    const organization =
      await this.organizationsService.findOne(organizationId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.service.addUserToOrganization(userId, organization);
  }

  @Delete(':organizationId/users/:userId')
  async removeUserFromOrganization(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
  ) {
    const organization =
      await this.organizationsService.findOne(organizationId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.service.removeUserFromOrganization(userId, organization);
  }
}
