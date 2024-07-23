import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HashService } from '../utils/services/hash.service';
import { UniqueEmailValidator } from './../utils/validators/unique-email.validator';
import { UniquePhoneValidator } from '../utils/validators/unique-phone.validator';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashService,
    UniqueEmailValidator,
    UniquePhoneValidator,
  ],
  exports: [UsersService],
})
export class UsersModule {}
