import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORGANIZATION_SERVICE } from '@app/common';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ClientsModule.registerAsync([
          {
            name: ORGANIZATION_SERVICE,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: configService.get('ORGANIZATION_SERVICE_HOST'),
                port: configService.get('ORGANIZATION_SERVICE_TCP_PORT'),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      providers: [OrganizationService],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
