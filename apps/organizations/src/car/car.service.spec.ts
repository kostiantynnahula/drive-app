import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { CARS_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('CarService', () => {
  let service: CarService;

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
      providers: [CarService],
    }).compile();

    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
