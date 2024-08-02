import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsDefined } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsDefined()
  carId: string;

  @IsDefined()
  organizationId: string;
}
