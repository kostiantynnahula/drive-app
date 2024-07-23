import { IsDefined, IsEmail, IsString } from 'class-validator';

export class NotificationEmailDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  token: string;
}
