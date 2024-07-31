import {
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

@Controller('organization')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Post(':id/car')
  async createCar(@Param('id') id: string, @Body() body: CreateCarDto) {
    return await this.service.create(id, body);
  }

  @Get(':id/cars')
  async findCars(@Param('id') id: string) {
    return await this.service.findAll(id);
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
