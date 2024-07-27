import { IsDefined } from 'class-validator';

export class OrganizationDto {
  @IsDefined()
  from: string;

  @IsDefined()
  to: string;

  @IsDefined()
  organizationName: string;
}
