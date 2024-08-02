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

  /**
   * Send forgot password notification
   * @param {string} email
   * @param {string} token
   */
  async forgotPassword(email: string, token: string): Promise<void> {
    await this.notificationsService.emit<NotificationResponse>(
      NotificationsServiceEvents.FORGOT_PASSWORD,
      { email, token },
    );
  }

  /**
   * Send reset password notification
   * @param {string} email
   */
  async resetPassword(email: string): Promise<void> {
    await this.notificationsService.emit<NotificationResponse>(
      NotificationsServiceEvents.SUCCESSFUL_PASSWORD_CHANGED,
      { email },
    );
  }

  /**
   * Send registration notification
   * @param {string} email
   */
  async registration(email: string): Promise<void> {
    await this.notificationsService.emit<NotificationResponse>(
      NotificationsServiceEvents.SUCCESSFUL_REGISTRATION,
      { email },
    );
  }

  /**
   * Send user added to organization notification
   * @param {string} from
   * @param {string} to
   * @param {string} organizationName
   */
  async addToOrganization(
    from: string,
    to: string,
    organizationName: string,
  ): Promise<void> {
    await this.notificationsService.emit<NotificationResponse>(
      NotificationsServiceEvents.USER_ADDED_TO_ORGANIZATION,
      { from, to, organizationName },
    );
  }

  /**
   * Send user removed from organization notification
   * @param {string} from
   * @param {string} to
   * @param {string} organizationName
   */
  async removeFromOrganization(
    from: string,
    to: string,
    organizationName: string,
  ): Promise<void> {
    await this.notificationsService.emit<NotificationResponse>(
      NotificationsServiceEvents.USER_REMOVED_FROM_ORGANIZATION,
      { from, to, organizationName },
    );
  }
}
