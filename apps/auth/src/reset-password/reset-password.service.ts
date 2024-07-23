import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResetPassword } from '.prisma/client';
import { NOTIFICATION_SERVICE, randomString } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ResetPasswordService {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationsService: ClientProxy,
    private readonly prismaService: PrismaService,
  ) {}

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

  async sendResetEmail(email: string) {
    const token = randomString();
    return this.notificationsService
      .send('reset-password-notification', {
        email,
        token,
      })
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }
}
