import { IsEnum, IsOptional, IsString } from 'class-validator';

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
}
