import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  NotFoundException,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { AddUserDto } from './dto/add-user.dto';
import { LocationsService } from '../locations/locations.service';
import { UsersQuery } from './dto/users.query';

@Controller('organization')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly organizationsService: OrganizationsService,
    private readonly locationsService: LocationsService,
  ) {}

  @Get(':organizationId/users')
  async findAll(
    @Param('organizationId') organizationId: string,
    @Query() query: UsersQuery,
  ) {
    const organization =
      await this.organizationsService.findOne(organizationId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.service.findAll(organizationId, query);
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

  @Post(':organizationId/user')
  async addUserToOrganization(
    @Param('organizationId') organizationId: string,
    @Body() body: AddUserDto,
  ) {
    const { userId, locationId } = body;

    const organization =
      await this.organizationsService.findOne(organizationId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const location = await this.locationsService.findOne(
      organization.id,
      locationId,
    );

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return await this.service.addUserToOrganization(
      userId,
      locationId,
      organization,
    );
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
