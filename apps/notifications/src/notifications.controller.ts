import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';
import { NotificationEmailDto } from './dto/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('reset-password-notification')
  async sendNotification({ email, token }: NotificationEmailDto) {
    await this.notificationsService.sendEmail(email, token);
    return {
      message: 'Notification sent successfully',
    };
  }
}
