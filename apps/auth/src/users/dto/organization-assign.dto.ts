import { Organization } from '@app/common';
import { IsDefined, IsString } from 'class-validator';

export class OrganizationAssignDto {
  @IsDefined()
  organization: Organization;

  @IsDefined()
  @IsString()
  userId: string;
}
