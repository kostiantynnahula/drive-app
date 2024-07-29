import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonOptionDto } from './create-lesson-option.dto';

export class UpdateLessonOptionDto extends PartialType(CreateLessonOptionDto) {}
