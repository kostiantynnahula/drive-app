import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { $Enums } from '.prisma/client';
import { UniqueEmailValidator } from '../validators/unique-email.validator';
import { UniquePhoneValidator } from '../validators/unique-phone.validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsEmail()
  @Validate(UniqueEmailValidator)
  email: string;

  @IsDefined()
  @IsPhoneNumber()
  @Validate(UniquePhoneValidator)
  phone: string;

  @IsDefined()
  @IsEnum($Enums.Gender)
  gender: $Enums.Gender;

  @IsDefined()
  @IsEnum($Enums.Role)
  role: $Enums.Role;

  @IsStrongPassword()
  password: string;
}
