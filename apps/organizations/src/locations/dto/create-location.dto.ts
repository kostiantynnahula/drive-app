import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsDefined()
  @IsNumber()
  latitude: number;

  @IsDefined()
  @IsNumber()
  longitude: number;

  @IsDefined()
  @IsString()
  country: string;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  @IsString()
  city: string;
}
