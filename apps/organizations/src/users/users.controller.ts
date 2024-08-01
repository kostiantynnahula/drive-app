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
import { CreateUserDto } from './dto/create-user.dto';
import { CarService } from '../car/car.service';

@Controller('organization')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly locationsService: LocationsService,
    private readonly carService: CarService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Post(':organizationId/user')
  async createUser(
    @Param('organizationId') organizationId: string,
    @Body() body: CreateUserDto,
  ) {
    const organization =
      await this.organizationsService.findOne(organizationId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.service.createOne(organizationId, body);
  }

  @Get(':organizationId/users')
  async findMany(
    @Param('organizationId') organizationId: string,
    @Query() query: UsersQuery,
  ) {
    const organization =
      await this.organizationsService.findOne(organizationId);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const users = await this.service.findAll(organizationId, query);

    const userLocationsIds = users.map((user) => user.locationId);

    const locations = await this.locationsService.findMany(organizationId, {
      ids: userLocationsIds,
    });

    const cars = await this.carService.findAll({
      organizationId,
      locationId: query.locationId,
      transmission: query.transmission,
    });

    const result = users.map((user) => {
      const location = locations.find(
        (location) => location.id === user.locationId,
      );

      const car = cars.find((car) => car.ownerId === user.id);

      return {
        ...user,
        car,
        location,
      };
    });

    if (query.transmission) {
      return result.filter((user) => user.car);
    }

    return result;
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

    const car = await this.carService.findOneByOwner(organizationId, userId);

    const user = await this.service.findOne(userId, organizationId);

    const location = await this.locationsService.findOne(
      organizationId,
      user.locationId,
    );

    return {
      ...user,
      location,
      car,
    };
  }

  @Post(':organizationId/user/add')
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
