import { IsDefined } from 'class-validator';

export class OrganizationUserAssignDto {
  @IsDefined()
  organizationId: string;

  @IsDefined()
  organizationEmail: string;

  @IsDefined()
  organizationName: string;

  @IsDefined()
  userId: string;
}
