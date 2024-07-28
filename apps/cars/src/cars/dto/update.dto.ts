import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
