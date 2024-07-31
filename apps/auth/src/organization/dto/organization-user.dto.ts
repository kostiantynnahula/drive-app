import { IsDefined } from 'class-validator';

export class OrganizationUserDto {
  @IsDefined()
  organizationId: string;

  @IsDefined()
  userId: string;
}
