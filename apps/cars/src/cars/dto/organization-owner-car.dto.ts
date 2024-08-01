import { IsDefined } from 'class-validator';

export class OrganizationOwnerCar {
  @IsDefined()
  organizationId: string;

  @IsDefined()
  ownerId: string;
}
