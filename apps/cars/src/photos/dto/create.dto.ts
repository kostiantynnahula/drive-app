import { IsDefined, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  @IsDefined()
  @IsUrl()
  url: string;

  @IsDefined()
  carId: string;
}
