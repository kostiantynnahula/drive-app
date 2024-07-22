import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
