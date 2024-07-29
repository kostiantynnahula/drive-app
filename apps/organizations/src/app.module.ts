import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { LocationsModule } from './locations/locations.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { LessonsOptionsModule } from './lessons-options/lessons-options.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
      }),
    }),
    OrganizationsModule,
    LocationsModule,
    UsersModule,
    LessonsOptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
