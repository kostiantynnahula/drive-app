import { IsDefined } from 'class-validator';

export class UpdateLogoDto {
  @IsDefined()
  userId: number;

  @IsDefined()
  logo: string;
}
