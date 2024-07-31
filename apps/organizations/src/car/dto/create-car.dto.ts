import { IsDefined, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsDefined()
  make: string;

  @IsDefined()
  model: string;

  @IsDefined()
  @IsNumber()
  year: number;

  @IsDefined()
  vin: string;

  @IsDefined()
  color: string;

  @IsDefined()
  ownerId: string;
}
