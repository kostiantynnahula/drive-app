import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: NOTIFICATION_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NOTIFICATIONS_HOST'),
            port: configService.get('NOTIFICATIONS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
