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
  async findMany(@Query() query: PaginationQuery) {
    return await this.service.findMany(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.service.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  async createOne(@Body() body: CreateUserDto) {
    return await this.service.createOne(body);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() body: Partial<User>) {
    const user = await this.service.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.service.updateOne(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const user = await this.service.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.service.deleteOne(id);
  }
}
