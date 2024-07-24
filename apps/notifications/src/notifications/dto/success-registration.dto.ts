import { IsDefined, IsEmail } from 'class-validator';

export class SuccessRegistrationDto {
  @IsDefined()
  @IsEmail()
  email: string;
}
