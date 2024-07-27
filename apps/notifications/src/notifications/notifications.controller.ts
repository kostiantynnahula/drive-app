import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MessagePattern } from '@nestjs/microservices';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NotificationsServiceEvents } from '@app/common';
import { EmailDto } from './dto/email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern(NotificationsServiceEvents.FORGOT_PASSWORD)
  async sendNotification({ email, token }: ResetPasswordDto) {
    await this.notificationsService.resetPasswordEmail(email, token);
    return {
      message: 'Notification sent successfully',
    };
  }

  @MessagePattern(NotificationsServiceEvents.SUCCESSFUL_REGISTRATION)
  async successRegistrationNotification({ email }: EmailDto) {
    await this.notificationsService.successRegistrationEmail(email);
    return {
      message: 'Notification sent successfully',
    };
  }

  @MessagePattern(NotificationsServiceEvents.SUCCESSFUL_PASSWORD_CHANGED)
  async successResetPasswordNotification({ email }: EmailDto) {
    console.log('password changed');
    await this.notificationsService.successResetPasswordEmail(email);
    return {
      message: 'Notification sent successfully',
    };
  }
}
