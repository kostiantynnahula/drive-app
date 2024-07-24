import {
  IsString,
  IsDefined,
  IsEmail,
  IsPhoneNumber,
  Validate,
} from 'class-validator';
import { UniqueNameValidator } from '../validators/unique-name.validator';
import { UniqueEmailValidator } from '../validators/unique-email.validator';
import { UniquePhoneValidator } from '../validators/unique-phone.validator';

export class CreateOrganizationDto {
  @IsDefined()
  @IsString()
  @Validate(UniqueNameValidator)
  name: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  @Validate(UniqueEmailValidator)
  email: string;

  @IsDefined()
  @IsString()
  @IsPhoneNumber()
  @Validate(UniquePhoneValidator)
  phone: string;

  @IsDefined()
  @IsString()
  description: string;
}
