import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getMany() {}

  @Get(':id')
  async getOne() {}

  @Post()
  async createOne() {}

  @Patch(':id')
  async updateOne() {}

  @Delete(':id')
  async deleteOne() {}
}
