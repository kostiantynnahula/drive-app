import { AUTH_SERVICE, AuthServiceEvents, User } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
  ) {}

  async findOneByOrganization(
    userId: string,
    organizationId: string,
  ): Promise<User> {
    const message = await this.authServiceClient.send(
      AuthServiceEvents.FIND_USER_BY_ORGANIZATION,
      { userId, organizationId },
    );
    return await firstValueFrom(message);
  }
}
