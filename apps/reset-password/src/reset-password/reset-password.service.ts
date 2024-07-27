import { Injectable } from '@nestjs/common';
import { ResetPassword } from '.prisma/client';
import { randomString } from '@app/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ResetPasswordService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Create a new record about reset password for a user
   *
   * @param {string} email
   * @returns {Promise<ResetPassword>}
   */
  async createReset(email: string): Promise<ResetPassword> {
    const token = randomString();
    return await this.prismaService.resetPassword.create({
      data: {
        email,
        token,
      },
    });
  }

  async findResetByEmail(email: string): Promise<ResetPassword | null> {
    return await this.prismaService.resetPassword.findFirst({
      where: { email, deletedAt: null },
    });
  }

  /**
   * Find token details
   *
   * @param {string} token
   * @returns {Promise<ResetPassword | null>}
   */
  async findTokenDetails(token: string): Promise<ResetPassword | null> {
    return await this.prismaService.resetPassword.findFirst({
      where: { token, deletedAt: null },
    });
  }

  /**
   * Find reset password record by token
   *
   * @param {string} token
   * @returns {Promise<ResetPassword | null>}
   */
  async findResetByToken(token: string): Promise<ResetPassword | null> {
    return await this.prismaService.resetPassword.findFirst({
      where: {
        token,
        deletedAt: null,
      },
    });
  }

  /**
   * Invalidate reset password record by email
   *
   * @param {email} email
   * @returns {Promise<ResetPassword>}
   */
  async invalidateToken(token: string, email: string): Promise<ResetPassword> {
    const expiredEmail = `${new Date().getTime()}-${email}`;
    return await this.prismaService.resetPassword.update({
      where: {
        email,
        token,
      },
      data: {
        email: expiredEmail,
        deletedAt: new Date(),
      },
    });
  }
}
