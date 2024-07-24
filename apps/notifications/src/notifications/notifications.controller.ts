import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SuccessRegistrationDto } from './dto/success-registration.dto';
import {
  RESET_PASSWORD_EMAIL,
  SUCCESSFUL_REGISTER_EMAIL,
  SUCCESSFUL_RESET_PASSWORD_EMAIL,
} from '@app/common';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern(RESET_PASSWORD_EMAIL)
  async sendNotification({ email, token }: ResetPasswordDto) {
    await this.notificationsService.resetPasswordEmail(email, token);
    return {
      message: 'Notification sent successfully',
    };
  }

  @EventPattern(SUCCESSFUL_REGISTER_EMAIL)
  async successRegistrationNotification({ email }: SuccessRegistrationDto) {
    await this.notificationsService.successRegistrationEmail(email);
    return {
      message: 'Notification sent successfully',
    };
  }

  @EventPattern(SUCCESSFUL_RESET_PASSWORD_EMAIL)
  async successResetPasswordNotification({ email }: SuccessRegistrationDto) {
    await this.notificationsService.successResetPasswordEmail(email);
    return {
      message: 'Notification sent successfully',
    };
  }
}
