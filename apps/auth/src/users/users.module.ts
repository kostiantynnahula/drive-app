import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersTcpController } from './users.tcp.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HashService } from '../utils/services/hash.service';
import { UniqueEmailValidator } from './../utils/validators/unique-email.validator';
import { UniquePhoneValidator } from '../utils/validators/unique-phone.validator';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORGANIZATION_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.registerAsync([
      {
        name: ORGANIZATION_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('ORGANIZATION_SERVICE_HOST'),
            port: configService.get('ORGANIZATION_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    NotificationsModule,
  ],
  controllers: [UsersController, UsersTcpController],
  providers: [
    UsersService,
    HashService,
    UniqueEmailValidator,
    UniquePhoneValidator,
  ],
  exports: [UsersService],
})
export class UsersModule {}
