import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CARS_SERVICE, AUTH_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocationsModule } from '../locations/locations.module';
import { CarService } from './car.service';
import { UsersService } from '../users/users.service';

describe('CarController', () => {
  let controller: CarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
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
    }).compile();

    controller = module.get<CarController>(CarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
