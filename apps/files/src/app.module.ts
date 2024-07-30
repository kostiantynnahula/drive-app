import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';
import * as Joi from 'joi';

@Module({
  imports: [
    OrganizationModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        AUTH_SERVICE_HOST: Joi.string().required(),
        AUTH_SERVICE_TCP_PORT: Joi.number().required(),
        ORGANIZATION_SERVICE_HOST: Joi.string().required(),
        ORGANIZATION_SERVICE_TCP_PORT: Joi.number().required(),
        CARS_SERVICE_HOST: Joi.string().required(),
        CARS_SERVICE_PORT: Joi.number().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        ORGANIZATION_THROTTLER_TTL: Joi.number().required(),
        ORGANIZATION_THROTTLER_LIMIT: Joi.number().required(),
        AWS_S3_BUCKET_NAME: Joi.string().required(),
        AWS_S3_ORGANIZATION_FOLDER: Joi.string().required(),
        AWS_S3_USER_FOLDER: Joi.string().required(),
        AWS_S3_CARS_FOLDER: Joi.string().required(),
      }),
    }),
    CarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
