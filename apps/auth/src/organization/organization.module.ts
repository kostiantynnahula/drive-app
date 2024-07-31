import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OrganizationController } from './organization.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
