import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  logo?: string;
}
