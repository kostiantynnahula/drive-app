import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, CARS_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { LocationsModule } from '../locations/locations.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    LocationsModule,
    ClientsModule.registerAsync([
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
    ]),
  ],
  controllers: [CarController],
  providers: [CarService, UsersService],
  exports: [CarService],
})
export class CarModule {}
