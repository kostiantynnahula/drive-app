import { IsDefined } from 'class-validator';

export class OrganizationDto {
  @IsDefined()
  organizationId: string;
}
