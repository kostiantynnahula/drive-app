import { IsDefined, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  @IsString()
  token: string;

  @IsDefined()
  @IsString()
  password: string;
}
