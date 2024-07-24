import { IsDefined, IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  token: string;
}
