import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { LessonType } from '.prisma/client';

@ValidatorConstraint({ async: true })
@Injectable()
export class LessonTypeValidator implements ValidatorConstraintInterface {
  public message = 'lesson type is invalid';

  async validate(lessonType: string[]): Promise<boolean> {
    return lessonType.every((el) =>
      Object.values(LessonType).includes(el as LessonType),
    );
  }

  defaultMessage(): string {
    return this.message;
  }
}
