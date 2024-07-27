import { AUTH_SERVICE, AuthServiceEvents } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { S3Service } from '../utils/services/s3.service';

@Injectable()
export class UsersService extends S3Service {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
    protected readonly configService: ConfigService,
  ) {
    super(configService, configService.get('AWS_S3_USER_FOLDER'));
  }

  async updateUserLogo(userId: string, logo: string) {
    const message = this.authServiceClient.send(
      AuthServiceEvents.UPDATE_USER_LOGO,
      {
        userId,
        logo,
      },
    );

    const result = await firstValueFrom(message);

    return result;
  }
}
