import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { LocationsService } from '../locations/locations.service';
import { UsersService } from '../users/users.service';
import { Role } from '@app/common';

@Controller('organization')
export class CarController {
  constructor(
    private readonly service: CarService,
    private readonly usersService: UsersService,
    private readonly locationService: LocationsService,
  ) {}

  @Post(':id/car')
  async createCar(@Param('id') id: string, @Body() body: CreateCarDto) {
    const { locationId, ownerId } = body;

    const location = await this.locationService.findOne(id, locationId);

    if (!location) {
      throw new BadRequestException('Location not found');
    }

    const user = await this.usersService.findOne(ownerId, id);

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

    const car = await this.service.findOneByOwner(id, ownerId);

    if (car) {
      throw new BadRequestException('User already has a car');
    }

    return await this.service.create(id, body);
  }

  @Get(':id/cars')
  async findCars(@Param('id') id: string) {
    return await this.service.findAll({ organizationId: id });
  }

  @Get(':id/car/:carId')
  async findCar(@Param('id') id: string, @Param('carId') carId: string) {
    return await this.service.findOne(id, carId);
  }

  @Patch(':id/car/:carId')
  async updateCar(
    @Param('id') id: string,
    @Param('carId') carId: string,
    @Body() body: UpdateCarDto,
  ) {
    return await this.service.update(id, carId, body);
  }

  @Delete(':id/car/:carId')
  async deleteCar(@Param('id') id: string, @Param('carId') carId: string) {
    return await this.service.delete(id, carId);
  }
}
