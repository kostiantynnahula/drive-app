import { IsOptional } from 'class-validator';

export class UsersQuery {
  @IsOptional()
  locationId: string;

  @IsOptional()
  role: 'USER' | 'INSTRUCTOR' | 'ADMIN' | 'SUPERADMIN';

  @IsOptional()
  transmisstion: string;
}
