import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  NotFoundException,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { AddUserDto } from './dto/add-user.dto';
import { LocationsService } from '../locations/locations.service';
import { UsersQuery } from './dto/users.query';
import { CreateUserDto } from './dto/create-user.dto';
import { CarService } from '../car/car.service';
import { CurrentUser, JwtAuthGuard, User } from '@app/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly locationsService: LocationsService,
    private readonly carService: CarService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Post()
  async createOne(@CurrentUser() user: User, @Body() body: CreateUserDto) {
    const organization = await this.organizationsService.findOne(
      user.organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.service.createOne(user.organizationId, body);
  }

  @Get()
  async findMany(@CurrentUser() user: User, @Query() query: UsersQuery) {
    const organization = await this.organizationsService.findOne(
      user.organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const users = await this.service.findMany(user.organizationId, query);

    const ids = users.map((user) => user.locationId);

    const locations = await this.locationsService.findMany(
      user.organizationId,
      { ids },
    );

    const cars = await this.carService.findMany({
      organizationId: user.organizationId,
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

  @Get(':userId')
  async findOne(@CurrentUser() user: User, @Param('userId') userId: string) {
    const organization = await this.organizationsService.findOne(
      user.organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const car = await this.carService.findOneByOwner(
      user.organizationId,
      userId,
    );

    const location = await this.locationsService.findOne(
      user.organizationId,
      user.locationId,
    );

    return {
      ...user,
      location,
      car,
    };
  }

  @Post('add')
  async addOne(@CurrentUser() user: User, @Body() body: AddUserDto) {
    const { userId, locationId } = body;

    const organization = await this.organizationsService.findOne(
      user.organizationId,
    );

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

  @Delete(':userId')
  async deleteOne(@CurrentUser() user: User, @Param('userId') userId: string) {
    const organization = await this.organizationsService.findOne(
      user.organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.service.removeUserFromOrganization(userId, organization);
  }
}
