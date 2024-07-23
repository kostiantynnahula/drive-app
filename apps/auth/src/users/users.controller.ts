import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { User } from '.prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './../utils/dto/create-user.dto';
import { UsersService } from './users.service';
import { PaginationQuery } from '@app/common';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getAll(@Query() query: PaginationQuery) {
    return await this.service.findAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const user = await this.service.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  async createOne(@Body() body: CreateUserDto) {
    return await this.service.create(body);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: number, @Body() body: Partial<User>) {
    const user = await this.service.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.service.update(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const user = await this.service.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.service.remove(id);
  }
}
