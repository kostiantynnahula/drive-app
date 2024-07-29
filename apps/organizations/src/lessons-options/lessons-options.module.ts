import { Module } from '@nestjs/common';
import { LessonsOptionsService } from './lessons-options.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LessonsOptionsController } from './lessons-options.controller';

@Module({
  imports: [PrismaModule],
  providers: [LessonsOptionsService],
  exports: [LessonsOptionsService],
  controllers: [LessonsOptionsController],
})
export class LessonsOptionsModule {}
