import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RESET_PASSWORD_SERVICE } from '@app/common';
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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ResetPasswordService } from './reset-password.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: RESET_PASSWORD_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('RESET_PASSWORD_SERVICE_HOST'),
            port: configService.get('RESET_PASSWORD_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
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
    ResetPasswordService,
  ],
})
export class AuthModule {}
