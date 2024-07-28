import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { PaginationQuery } from '@app/common';
import { CreateCarDto } from './dto/create.dto';
import { UpdateCarDto } from './dto/update.dto';
import { UsersService } from '../users/users.service';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getMany(@Query() query: PaginationQuery) {
    return await this.carsService.findMany(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.carsService.findOne(id);
  }

  @Post()
  async createOne(@Body() body: CreateCarDto) {
    const { ownerId, organizationId } = body;

    const user = await this.usersService.findOneByOrganization(
      ownerId,
      organizationId,
    );

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.carsService.createOne(body);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() body: UpdateCarDto) {
    const { ownerId, organizationId } = body;

    const user = await this.usersService.findOneByOrganization(
      ownerId,
      organizationId,
    );

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.carsService.updateOne(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.carsService.deleteOne(id);
  }
}
