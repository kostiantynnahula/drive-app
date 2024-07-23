import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '.prisma/client';
import { CurrentUser } from '@app/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
