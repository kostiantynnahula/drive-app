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
   * @param {number} userId
   * @returns {Promise<ResetPassword>}
   */
  async createReset(userId: string): Promise<ResetPassword> {
    const token = randomString();
    return await this.prismaService.resetPassword.create({
      data: {
        userId,
        token,
      },
    });
  }

  /**
   * Find reset password record by user id
   *
   * @param {number} userId
   * @returns {Promise<ResetPassword | null>}
   */
  async findResetByUserId(userId: string): Promise<ResetPassword | null> {
    return await this.prismaService.resetPassword.findFirst({
      where: {
        userId,
        deletedAt: null,
      },
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
   * Invalidate reset password record by id
   *
   * @param {number} id
   * @returns {Promise<ResetPassword>}
   */
  async invalidateReset(id: string): Promise<ResetPassword> {
    return await this.prismaService.resetPassword.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
