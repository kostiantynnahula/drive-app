import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsEventController } from './organizations.event.controller';
import { OrganizationsService } from './organizations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UniqueNameValidator } from './validators/unique-name.validator';
import { UniqueEmailValidator } from './validators/unique-email.validator';
import { UniquePhoneValidator } from './validators/unique-phone.validator';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';
import { UsersService } from './users.service';

@Module({
  imports: [
    PrismaModule,
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
  controllers: [OrganizationsController, OrganizationsEventController],
  providers: [
    OrganizationsService,
    UniqueNameValidator,
    UniqueEmailValidator,
    UniquePhoneValidator,
    UsersService,
  ],
})
export class OrganizationsModule {}
