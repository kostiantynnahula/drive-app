import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      }),
    }),
    CarsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
