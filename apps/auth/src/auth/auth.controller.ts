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
import { CurrentUser } from '@app/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '.prisma/client';
import { CreateUserDto } from '../utils/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ResetPasswordService } from '../../../reset-password/src/reset-password/reset-password.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordEmitterService } from '../../../reset-password/src/reset-password/reset-password-emitter.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly resetPasswordEmitterService: ResetPasswordEmitterService,
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
    await this.resetPasswordEmitterService.registrationEmail(body.email);
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
    return await this.usersService.update(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(body.email);

    if (user) {
      const resetData = await this.resetPasswordService.findResetByUserId(
        user.id,
      );

      if (resetData) {
        await this.resetPasswordService.invalidateReset(resetData.id);
      }

      const { token } = await this.resetPasswordService.createReset(user.id);

      return await this.resetPasswordEmitterService.resetPasswordEmail(
        body.email,
        token,
      );
    }

    return {
      message: 'Email not found',
    };
  }

  @Post('reset-password')
  async resetPassowrd(@Body() body: ResetPasswordDto) {
    const resetData = await this.resetPasswordService.findResetByToken(
      body.token,
    );

    if (!resetData) {
      throw new BadRequestException();
    }

    const user = await this.usersService.findOne(resetData.userId);

    if (!user) {
      throw new BadRequestException();
    }

    const result = await this.usersService.update(user.id, {
      password: body.password,
    });

    await this.resetPasswordService.invalidateReset(resetData.id);

    await this.resetPasswordEmitterService.resetPasswordSuccessEmail(
      user.email,
    );

    return result;
  }
}
