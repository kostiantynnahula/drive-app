import { AUTH_SERVICE, UPDATE_USER_LOGO } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
  ) {}

  async updateUserLogo(userId: number, logo: string) {
    const message = this.authServiceClient.send(UPDATE_USER_LOGO, {
      userId,
      logo,
    });

    const result = await firstValueFrom(message);

    return result;
  }
}
