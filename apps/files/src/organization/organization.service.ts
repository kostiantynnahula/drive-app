import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ORGANIZATION_SERVICE, OrganizationServiceEvents } from '@app/common';
import { firstValueFrom } from 'rxjs';
import { S3Service } from '../utils/services/s3.service';

@Injectable()
export class OrganizationService extends S3Service {
  constructor(
    @Inject(ORGANIZATION_SERVICE)
    private readonly organizationServiceClient: ClientProxy,
    protected readonly configService: ConfigService,
  ) {
    super(configService, configService.get('AWS_S3_ORGANIZATION_FOLDER'));
  }

  async updateOrganizationLogo(organizationId: string, logo: string) {
    const message = this.organizationServiceClient.send(
      OrganizationServiceEvents.UPDATE_ORGANIZATION_LOGO,
      {
        organizationId,
        logo,
      },
    );

    return await firstValueFrom(message);
  }

  async findOrganization(organizationId: string) {
    const message = this.organizationServiceClient.send(
      OrganizationServiceEvents.FIND_ORGANIZATION,
      {
        organizationId,
      },
    );

    return await firstValueFrom(message);
  }
}
