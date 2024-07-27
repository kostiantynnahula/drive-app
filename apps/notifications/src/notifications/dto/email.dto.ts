import { IsDefined, IsEmail } from 'class-validator';

export class EmailDto {
  @IsDefined()
  @IsEmail()
  email: string;
}
