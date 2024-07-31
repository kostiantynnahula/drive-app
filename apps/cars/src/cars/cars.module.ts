import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { OrganizationCarsService } from './organization-cars.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CarsController],
  providers: [CarsService, OrganizationCarsService],
})
export class CarsModule {}
