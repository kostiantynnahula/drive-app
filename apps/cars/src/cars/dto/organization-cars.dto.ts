import { IsDefined, IsOptional } from 'class-validator';
import { $Enums } from '.prisma/client';

export class OrganizationCarsDto {
  @IsDefined()
  organizationId: string;

  @IsOptional()
  owners: string[];

  @IsOptional()
  transmission: $Enums.TransmissionType;

  @IsOptional()
  locationId: string;
}
