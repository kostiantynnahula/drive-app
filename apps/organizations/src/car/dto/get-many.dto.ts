import { IsDefined, IsEnum, IsOptional } from 'class-validator';

export class GetCarsDto {
  @IsDefined()
  organizationId: string;

  @IsOptional()
  owners?: string[];

  @IsOptional()
  @IsEnum(['MANUAL', 'AUTOMATIC'])
  transmission?: 'MANUAL' | 'AUTOMATIC';

  @IsOptional()
  locationId?: string;
}
