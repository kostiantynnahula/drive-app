import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CARS_SERVICE } from '@app/common';
import { CarsService } from './cars.service';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
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
      controllers: [CarsController],
      providers: [CarsService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
