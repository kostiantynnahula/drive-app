import {
  RESET_PASSWORD_SERVICE,
  ResetPasswordEvent,
  ResetTokenResponse,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ResetPasswordService {
  constructor(
    @Inject(RESET_PASSWORD_SERVICE)
    private readonly resetPasswordService: ClientProxy,
  ) {}

  async forgotPassword(email: string): Promise<ResetTokenResponse> {
    const message = await this.resetPasswordService.send<ResetTokenResponse>(
      ResetPasswordEvent.FORGOT_PASSWORD,
      { email },
    );

    return await firstValueFrom(message);
  }

  async verifyToken(token: string): Promise<boolean> {
    const message = await this.resetPasswordService.send<boolean>(
      ResetPasswordEvent.VERIFY_TOKEN,
      { token },
    );

    return await firstValueFrom(message);
  }

  async findTokenDetails(token: string): Promise<ResetTokenResponse> {
    const message = await this.resetPasswordService.send<ResetTokenResponse>(
      ResetPasswordEvent.FIND_TOKEN_DETAILS,
      { token },
    );

    return await firstValueFrom(message);
  }

  async invalidateToken(token: string, email: string): Promise<boolean> {
    const message = await this.resetPasswordService.send<boolean>(
      ResetPasswordEvent.INVALIDATE_TOKEN,
      { token, email },
    );

    return await firstValueFrom(message);
  }
}
