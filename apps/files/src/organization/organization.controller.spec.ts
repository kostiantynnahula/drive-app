import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { ORGANIZATION_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrganizationService } from './organization.service';

describe('OrganizationController', () => {
  let controller: OrganizationController;

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
      controllers: [OrganizationController],
      providers: [OrganizationService],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
