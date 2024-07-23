import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@Module({
  imports: [AuthModule, UsersModule, ResetPasswordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
