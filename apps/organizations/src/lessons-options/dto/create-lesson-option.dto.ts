import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator';
import { $Enums } from '.prisma/client';

export class CreateLessonOptionDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsNumber()
  price: number;

  @IsDefined()
  @IsEnum($Enums.LessonType)
  lessonType: $Enums.LessonType;
}
