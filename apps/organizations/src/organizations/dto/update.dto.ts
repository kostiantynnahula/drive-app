import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create.dto';
import { IsOptional } from 'class-validator';
import { CreateLessonOptionDto } from '../../lessons-options/dto/create-lesson-option.dto';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  logo?: string;

  @IsOptional()
  lessonsOptions?: CreateLessonOptionDto[];
}
