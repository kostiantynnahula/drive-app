import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CARS_SERVICE } from '@app/common';

describe('CarsService', () => {
  let service: CarsService;

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
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
