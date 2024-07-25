import { IsOptional } from 'class-validator';
import { CreateUserDto } from './../../utils/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  email?: string;

  @IsOptional()
  logo?: string;
}
