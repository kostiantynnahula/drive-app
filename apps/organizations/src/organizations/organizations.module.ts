import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsTcpController } from './organizations.tcp.controller';
import { OrganizationsService } from './organizations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UniqueNameValidator } from './validators/unique-name.validator';
import { UniqueEmailValidator } from './validators/unique-email.validator';
import { UniquePhoneValidator } from './validators/unique-phone.validator';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';
import { LessonsOptionsModule } from '../lessons-options/lessons-options.module';

@Module({
  imports: [
    PrismaModule,
    LessonsOptionsModule,
    ClientsModule.registerAsync([
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
  controllers: [OrganizationsController, OrganizationsTcpController],
  providers: [
    OrganizationsService,
    UniqueNameValidator,
    UniqueEmailValidator,
    UniquePhoneValidator,
  ],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
