import { IsDefined, IsOptional } from 'class-validator';
import { CreateUserDto } from '../../utils/dto/create-user.dto';

export class OrganizationCreateUserDto extends CreateUserDto {
  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsDefined()
  organizationId: string;

  @IsDefined()
  locationId: string;
}
