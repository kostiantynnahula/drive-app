import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthServiceEvents, CurrentUser } from '@app/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '.prisma/client';
import { CreateUserDto } from '../utils/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordService } from './reset-password.service';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const result = await this.authService.register(body);
    await this.notificationsService.registration(body.email);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@CurrentUser() user: User, @Body() body: Partial<User>) {
    return await this.usersService.updateOne(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(AuthServiceEvents.AUTHENTICATE)
  async authenticate(@Payload() data: { user: User }) {
    return data.user;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const result = await this.resetPasswordService.forgotPassword(email);

      await this.notificationsService.forgotPassword(email, result.token);

      return {
        message: 'Reset password email sent',
      };
    }

    return {
      message: 'Email not found',
    };
  }

  @Post('reset-password')
  async resetPassowrd(@Body() { token, password }: ResetPasswordDto) {
    const tokenDetails =
      await this.resetPasswordService.findTokenDetails(token);

    if (!tokenDetails) {
      throw new BadRequestException();
    }

    const user = await this.usersService.findByEmail(tokenDetails.email);

    if (!user) {
      throw new BadRequestException();
    }

    const result = await this.usersService.updateOne(user.id, { password });

    await this.resetPasswordService.invalidateToken(token, user.email);

    await this.notificationsService.resetPassword(user.email);

    return result;
  }
}
