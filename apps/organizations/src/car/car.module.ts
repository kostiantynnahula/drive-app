import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CARS_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
    ]),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
