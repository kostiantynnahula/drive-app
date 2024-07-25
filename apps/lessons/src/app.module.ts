import { Module } from '@nestjs/common';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [LessonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
