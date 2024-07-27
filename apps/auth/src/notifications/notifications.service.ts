import {
  NOTIFICATION_SERVICE,
  NotificationsServiceEvents,
  NotificationResponse,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async forgotPassword(email: string, token: string): Promise<void> {
    await this.notificationsService.send<NotificationResponse>(
      NotificationsServiceEvents.FORGOT_PASSWORD,
      { email, token },
    );
  }

  async resetPassword(email: string): Promise<void> {
    await this.notificationsService.send<NotificationResponse>(
      NotificationsServiceEvents.SUCCESSFUL_PASSWORD_CHANGED,
      { email },
    );
  }

  async registration(email: string): Promise<void> {
    await this.notificationsService.send<NotificationResponse>(
      NotificationsServiceEvents.SUCCESSFUL_REGISTRATION,
      { email },
    );
  }
}
