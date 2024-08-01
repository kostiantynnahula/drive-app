import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OrganizationController } from './organization.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { HashService } from '../utils/services/hash.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, HashService, UsersService],
})
export class OrganizationModule {}
