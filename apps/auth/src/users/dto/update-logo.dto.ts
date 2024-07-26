import { IsDefined } from 'class-validator';

export class UpdateLogoDto {
  @IsDefined()
  userId: string;

  @IsDefined()
  logo: string;
}
