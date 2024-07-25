import { ORGANIZATION_SERVICE, UPDATE_ORGANIZATION_LOGO } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(ORGANIZATION_SERVICE)
    private readonly organizationServiceClient: ClientProxy,
  ) {}

  async updateOrganizationLogo(organizationId: string, logo: string) {
    const message = this.organizationServiceClient.send(
      UPDATE_ORGANIZATION_LOGO,
      {
        organizationId,
        logo,
      },
    );

    const result = await firstValueFrom(message);

    return result;
  }
}
