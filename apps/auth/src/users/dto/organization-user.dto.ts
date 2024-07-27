import { IsDefined, IsString } from 'class-validator';

export class OrganizationUserDto {
  @IsDefined()
  organizationId: string;

  @IsDefined()
  @IsString()
  userId: string;
}
