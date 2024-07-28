import { IsDefined, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsDefined()
  make: string;

  @IsDefined()
  model: string;

  @IsDefined()
  year: number;

  @IsDefined()
  vin: string;

  @IsDefined()
  color: string;

  @IsDefined()
  ownerId: string;

  @IsOptional()
  organizationId: string;
}
