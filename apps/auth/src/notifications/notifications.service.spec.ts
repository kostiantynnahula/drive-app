import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ClientsModule.registerAsync([
          {
            name: NOTIFICATION_SERVICE,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: configService.get('NOTIFICATIONS_SERVICE_HOST'),
                port: configService.get('NOTIFICATIONS_SERVICE_PORT'),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      providers: [NotificationsService],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
