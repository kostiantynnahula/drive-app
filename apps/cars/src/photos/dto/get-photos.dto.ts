import { IsDefined } from 'class-validator';

export class GetPhotosDto {
  @IsDefined()
  carId: string;
}
