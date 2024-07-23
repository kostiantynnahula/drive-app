import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HashService } from './../utils/services/hash.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UniqueEmailValidator } from '../utils/validators/unique-email.validator';
import { UsersService } from '../users/users.service';
import { jwtConfigFactory, configValidationSchema } from './helpers';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    JwtModule.registerAsync({
      useFactory: jwtConfigFactory,
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStategy,
    JwtStrategy,
    HashService,
    UniqueEmailValidator,
    UsersService,
  ],
})
export class AuthModule {}
