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
import { CurrentUser, JwtAuthGuard, Role, User } from '@app/common';

@UseGuards(JwtAuthGuard)
@Controller('cars')
export class CarController {
  constructor(
    private readonly service: CarService,
    private readonly locationService: LocationsService,
  ) {}

  @Post()
  async createCar(@CurrentUser() user: User, @Body() body: CreateCarDto) {
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
      if (user.role !== Role.INSTRUCTOR) {
        throw new BadRequestException('User is not an instructor');
      }

      if (user.locationId !== locationId) {
        throw new BadRequestException('User is not in the same location');
      }
    }

    const car = await this.service.findOneByOwner(user.organizationId, ownerId);

    if (car) {
      throw new BadRequestException('User already has a car');
    }

    return await this.service.create(user.organizationId, body);
  }

  @Get()
  async findCars(@CurrentUser() user: User) {
    return await this.service.findAll({ organizationId: user.organizationId });
  }

  @Get(':carId')
  async findCar(@CurrentUser() user: User, @Param('carId') carId: string) {
    return await this.service.findOne(user.organizationId, carId);
  }

  @Patch(':carId')
  async updateCar(
    @Param('carId') carId: string,
    @Body() body: UpdateCarDto,
    @CurrentUser() user: User,
  ) {
    return await this.service.update(user.organizationId, carId, body);
  }

  @Delete(':carId')
  async deleteCar(@CurrentUser() user: User, @Param('carId') carId: string) {
    return await this.service.delete(user.organizationId, carId);
  }
}
