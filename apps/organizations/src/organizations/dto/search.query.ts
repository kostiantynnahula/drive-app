import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { LessonType } from '.prisma/client';
import { Transform } from 'class-transformer';
import { LessonTypeValidator } from '../validators/lesson-type.validator';

export class SearchQuery {
  @IsOptional()
  take?: number;

  @IsOptional()
  skip?: number;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: string;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  @Validate(LessonTypeValidator)
  lessonTypes: LessonType[];

  @IsOptional()
  @IsNumber()
  priceFrom?: number;

  @IsOptional()
  @IsNumber()
  priceTo?: number;

  @IsOptional()
  @IsNumber()
  rating?: number;
}
