import { IsDefined } from 'class-validator';

export class OrganizationCarDto {
  @IsDefined()
  organizationId: string;

  @IsDefined()
  carId: string;
}
