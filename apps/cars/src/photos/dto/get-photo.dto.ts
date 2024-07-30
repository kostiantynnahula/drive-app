import { IsDefined } from 'class-validator';

export class GetPhotoDto {
  @IsDefined()
  carId: string;

  @IsDefined()
  photoId: string;
}
