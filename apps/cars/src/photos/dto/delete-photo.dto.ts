import { IsDefined } from 'class-validator';

export class DeletePhotoDto {
  @IsDefined()
  carId: string;

  @IsDefined()
  photoId: string;
}
