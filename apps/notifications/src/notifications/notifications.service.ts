import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OrganizationDto } from './dto/organization.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Send email about reset password
   *
   * @param {string} email
   * @param {string} token
   */
  async forgotPasswordEmail(email: string, token: string): Promise<void> {
    const resetPasswordHost = this.configService.get('RESET_PASSWORD_HOST');
    const link = `${resetPasswordHost}/reset-password?token=${token}`;
    await this.mailService.sendMail({
      to: email,
      subject: 'Forgot password email',
      html: `<div>
        <h1>Reset password</h1>
        <p>Click <a href="${link}">here</a> to reset your password</p>
      <div>`,
    });
  }

  /**
   * Send email about successful registration
   *
   * @param {string} email
   */
  async successRegistrationEmail(email: string): Promise<void> {
    await this.mailService.sendMail({
      to: email,
      subject: 'Registration Successful',
      html: `<div>
        <h1>Registration Successful</h1>
        <p>Your registration was successful</p>
      </div>`,
    });
  }

  /**
   * Send email about successful reset password
   *
   * @param {string} email
   */
  async successResetPasswordEmail(email: string): Promise<void> {
    await this.mailService.sendMail({
      to: email,
      subject: 'Password was changed succsfully',
      html: `<div>
        <h1>Password was changed succsfully</h1>
        <p>Your password was changed successfully</p>
      </div>`,
    });
  }

  /**
   * Send email about user added to organization
   *
   * @param {OrganizationDto} data
   */
  async userAddedToOrganization({
    from,
    to,
    organizationName,
  }: OrganizationDto): Promise<void> {
    await this.mailService.sendMail({
      from,
      to,
      subject: `You was successfully added to <b>${organizationName}</b> organization`,
      html: `<div>
        <h1>You are a new member of ${organizationName} organization</h1>
        <p>Congradulation! You are a new member of organization</p>
      </div>`,
    });
  }

  /**
   * Send email about user removed from organization
   *
   * @param {OrganizationDto} data
   */
  async userRemovedFromOrganization({
    from,
    to,
    organizationName,
  }: OrganizationDto): Promise<void> {
    await this.mailService.sendMail({
      from,
      to,
      subject: `You was removed from <b>${organizationName}</b> organization`,
      html: `<div>
        <h1>We are notifying you about organization changes!</h1>
        <p>From this moment you are not a member of the ${organizationName} organization</p>
      </div>`,
    });
  }
}
