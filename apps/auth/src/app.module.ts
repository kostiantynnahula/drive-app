import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        ORGANIZATION_HOST: Joi.string().required(),
        ORGANIZATION_PORT: Joi.number().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
