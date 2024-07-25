import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsEventController } from './organizations.event.controller';
import { OrganizationsService } from './organizations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UniqueNameValidator } from './validators/unique-name.validator';
import { UniqueEmailValidator } from './validators/unique-email.validator';
import { UniquePhoneValidator } from './validators/unique-phone.validator';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationsController, OrganizationsEventController],
  providers: [
    OrganizationsService,
    UniqueNameValidator,
    UniqueEmailValidator,
    UniquePhoneValidator,
  ],
})
export class OrganizationsModule {}
