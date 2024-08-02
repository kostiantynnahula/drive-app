import { Module } from '@nestjs/common';
import { LessonsOptionsService } from './lessons-options.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LessonsOptionsController } from './lessons-options.controller';
import { AuthModule } from './../../utils/modules/auth.module';

@Module({
  imports: [PrismaModule, AuthModule()],
  providers: [LessonsOptionsService],
  exports: [LessonsOptionsService],
  controllers: [LessonsOptionsController],
})
export class LessonsOptionsModule {}
