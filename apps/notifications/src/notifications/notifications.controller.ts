import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NotificationsServiceEvents } from '@app/common';
import { EmailDto } from './dto/email.dto';
import { OrganizationDto } from './dto/organization.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern(NotificationsServiceEvents.FORGOT_PASSWORD)
  async sendNotification({ email, token }: ResetPasswordDto) {
    await this.notificationsService.resetPasswordEmail(email, token);
    return {
      message: 'Notification sent successfully',
    };
  }

  @EventPattern(NotificationsServiceEvents.SUCCESSFUL_REGISTRATION)
  async successRegistrationNotification({ email }: EmailDto) {
    await this.notificationsService.successRegistrationEmail(email);
    return {
      message: 'Notification sent successfully',
    };
  }

  @EventPattern(NotificationsServiceEvents.SUCCESSFUL_PASSWORD_CHANGED)
  async successResetPasswordNotification({ email }: EmailDto) {
    await this.notificationsService.successResetPasswordEmail(email);
    return {
      message: 'Notification sent successfully',
    };
  }

  @EventPattern(NotificationsServiceEvents.USER_ADDED_TO_ORGANIZATION)
  async userAddedToOrganizationNotification(data: OrganizationDto) {
    await this.notificationsService.userAddedToOrganizationNotification(data);
    return {
      message: 'Notification sent successfully',
    };
  }

  @EventPattern(NotificationsServiceEvents.USER_REMOVED_FROM_ORGANIZATION)
  async userRemovedFromOrganizationNotification(data: OrganizationDto) {
    await this.notificationsService.userAddedToOrganizationNotification(data);
    return {
      message: 'Notification sent successfully',
    };
  }
}
