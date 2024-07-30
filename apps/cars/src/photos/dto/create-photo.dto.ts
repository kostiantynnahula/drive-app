import { IsArray, IsDefined } from 'class-validator';

export class CreatePhotoDto {
  @IsDefined()
  @IsArray()
  urls: string[];

  @IsDefined()
  carId: string;
}
