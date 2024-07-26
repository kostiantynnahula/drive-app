import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HashService } from './../utils/services/hash.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UniqueEmailValidator } from '../utils/validators/unique-email.validator';
import { UsersService } from '../users/users.service';
import { UniquePhoneValidator } from '../utils/validators/unique-phone.validator';
import { ResetPasswordModule } from '../../../reset-password/src/reset-password/reset-password.module';

@Module({
  imports: [
    LoggerModule,
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ResetPasswordModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStategy,
    JwtStrategy,
    HashService,
    UniqueEmailValidator,
    UniquePhoneValidator,
    UsersService,
  ],
})
export class AuthModule {}
