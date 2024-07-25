import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsEventController } from './organizations.event.controller';
import { OrganizationsService } from './organizations.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [OrganizationsController, OrganizationsEventController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
