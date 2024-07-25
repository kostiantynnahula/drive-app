import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORGANIZATION_SERVICE } from '@app/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
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
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get('THROTTLER_TTL'),
          limit: configService.get('THROTTLER_LIMIT'),
        },
      ],
      inject: [ConfigService],
    }),
  ],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class OrganizationModule {}
