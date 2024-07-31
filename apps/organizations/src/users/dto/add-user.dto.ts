import { IsDefined } from 'class-validator';

export class AddUserDto {
  @IsDefined()
  userId: string;

  @IsDefined()
  locationId: string;
}
