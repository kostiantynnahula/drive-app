import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResetPassword } from '.prisma/client';
import { randomString } from '@app/common';

@Injectable()
export class ResetPasswordService {
  constructor(private readonly prismaService: PrismaService) {}

  async createResetToken(userId: number): Promise<ResetPassword> {
    const token = randomString();
    return await this.prismaService.resetPassword.create({
      data: {
        userId,
        token,
      },
    });
  }

  async findUserToken(userId: number): Promise<ResetPassword | null> {
    return await this.prismaService.resetPassword.findFirst({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }

  async deleteToken(id: number): Promise<ResetPassword> {
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
