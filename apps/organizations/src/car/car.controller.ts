import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { LocationsService } from '../locations/locations.service';
import {
  CurrentUser,
  hasUserRole,
  JwtAuthGuard,
  Role,
  User,
} from '@app/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Cars')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cars')
export class CarController {
  constructor(
    private readonly service: CarService,
    private readonly locationService: LocationsService,
  ) {}

  @Post()
  async createOne(@CurrentUser() user: User, @Body() body: CreateCarDto) {
    const { locationId, ownerId } = body;

    const location = await this.locationService.findOne(
      user.organizationId,
      locationId,
    );

    if (!location) {
      throw new BadRequestException('Location not found');
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user) {
      hasUserRole(user, Role.INSTRUCTOR);

      if (user.locationId !== locationId) {
        throw new BadRequestException('User is not in the same location');
      }
    }

    const car = await this.service.findOneByOwner(user.organizationId, ownerId);

    if (car) {
      throw new BadRequestException('User already has a car');
    }

    return await this.service.createOne(user.organizationId, body);
  }

  @Get()
  async findMany(@CurrentUser() user: User) {
    return await this.service.findMany({ organizationId: user.organizationId });
  }

  @Get(':carId')
  async findOne(@CurrentUser() user: User, @Param('carId') carId: string) {
    return await this.service.findOne(user.organizationId, carId);
  }

  @Patch(':carId')
  async updateOne(
    @Param('carId') carId: string,
    @Body() body: UpdateCarDto,
    @CurrentUser() user: User,
  ) {
    return await this.service.updateOne(user.organizationId, carId, body);
  }

  @Delete(':carId')
  async deleteOne(@CurrentUser() user: User, @Param('carId') carId: string) {
    return await this.service.deleteOne(user.organizationId, carId);
  }
}
