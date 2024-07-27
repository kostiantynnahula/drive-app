import { Inject, Injectable } from '@nestjs/common';
import {
  NOTIFICATION_SERVICE,
  RESET_PASSWORD_EMAIL,
  SUCCESSFUL_REGISTER_EMAIL,
  SUCCESSFUL_RESET_PASSWORD_EMAIL,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ResetPasswordTcpService {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  /**
   * Emit notificationmicroservice to send email notification about reset password
   *
   * @param {string} email
   * @param {string} token
   */
  async resetPasswordEmail(email: string, token: string): Promise<void> {
    await this.notificationsService
      .emit(RESET_PASSWORD_EMAIL, {
        email,
        token,
      })
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }

  /**
   * Emit notificationmicroservice to send email notification about successful registration
   *
   * @param {string} email
   */
  async registrationEmail(email: string): Promise<void> {
    await this.notificationsService
      .emit(SUCCESSFUL_REGISTER_EMAIL, {
        email,
      })
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }

  /**
   * Emit notificationmicroservice to send email notification about successful reset password
   *
   * @param {string} email
   */
  async resetPasswordSuccessEmail(email: string) {
    await this.notificationsService
      .emit(SUCCESSFUL_RESET_PASSWORD_EMAIL, {
        email,
      })
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }
}
