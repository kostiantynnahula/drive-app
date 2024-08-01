import { IsDefined, IsEnum, IsOptional } from 'class-validator';

export class GetManyDto {
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
