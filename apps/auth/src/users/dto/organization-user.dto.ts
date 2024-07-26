import { IsDefined, IsString } from 'class-validator';

export class OrganizationUserDto {
  @IsDefined()
  @IsString()
  organizationId: string;

  @IsDefined()
  @IsString()
  userId: string;
}
