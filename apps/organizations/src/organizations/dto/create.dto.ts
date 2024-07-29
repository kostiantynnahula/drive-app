import {
  IsString,
  IsDefined,
  IsEmail,
  IsPhoneNumber,
  Validate,
  ValidateNested,
} from 'class-validator';
import { UniqueNameValidator } from '../validators/unique-name.validator';
import { UniqueEmailValidator } from '../validators/unique-email.validator';
import { UniquePhoneValidator } from '../validators/unique-phone.validator';
import { Type } from 'class-transformer';
import { CreateLessonOptionDto } from '../../lessons-options/dto/create-lesson-option.dto';

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

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonOptionDto)
  lessonsOptions: CreateLessonOptionDto[];
}
