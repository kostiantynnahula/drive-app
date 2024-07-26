import { IsDefined, IsString } from 'class-validator';

export class OrganizationUsersDto {
  @IsDefined()
  @IsString()
  organizationId: string;
}
