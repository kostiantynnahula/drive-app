import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(email: string, token: string) {
    await this.mailService.sendMail({
      from: 'test@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `Your reset password token is ${token}`,
    });
  }
}
