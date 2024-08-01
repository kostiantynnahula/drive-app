import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsPhoneNumber()
  phone: string;

  @IsDefined()
  @IsEnum(['MALE', 'FAMALE'])
  gender: 'MALE' | 'FAMALE';

  @IsDefined()
  @IsEnum(['ADMIN', 'INSTRUCTOR'])
  role: 'ADMIN' | 'INSTRUCTOR';

  @IsStrongPassword()
  password: string;

  @IsDefined()
  locationId: string;
}
