import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { $Enums } from '.prisma/client';

export class OrganizationDto {
  @IsDefined()
  organizationId: string;

  @IsOptional()
  locationId: string;

  @IsOptional()
  role: $Enums.Role;

  @IsOptional()
  @IsEnum(['MANUAL', 'AUTOMATIC'])
  transmission: 'MANUAL' | 'AUTOMATIC';
}
