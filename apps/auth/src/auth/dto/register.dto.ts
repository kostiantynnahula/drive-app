import {
  IsDefined,
  IsEmail,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { UniqueEmailValidator } from '../../utils/validators/unique-email.validator';

export class RegisterUserDto {
  @IsDefined()
  @IsEmail()
  @Validate(UniqueEmailValidator)
  email: string;

  @IsDefined()
  @IsStrongPassword()
  password: string;
}
