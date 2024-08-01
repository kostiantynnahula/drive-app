import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, CARS_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrganizationsService } from './../organizations/organizations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LocationsService } from '../locations/locations.service';
import { CarService } from '../car/car.service';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: CARS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('CARS_SERVICE_HOST'),
            port: configService.get('CARS_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, OrganizationsService, LocationsService, CarService],
  exports: [UsersService],
})
export class UsersModule {}
