import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsTcpController } from './organizations.tcp.controller';
import { OrganizationsService } from './organizations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UniqueNameValidator } from './validators/unique-name.validator';
import { UniqueEmailValidator } from './validators/unique-email.validator';
import { UniquePhoneValidator } from './validators/unique-phone.validator';
import { LessonsOptionsModule } from '../lessons-options/lessons-options.module';
import { AuthModule } from './../../utils/modules/auth.module';

@Module({
  imports: [PrismaModule, LessonsOptionsModule, AuthModule()],
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
