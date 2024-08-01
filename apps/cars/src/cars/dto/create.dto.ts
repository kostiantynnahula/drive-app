import { IsDefined } from 'class-validator';
import { $Enums } from '.prisma/client';

export class CreateCarDto {
  @IsDefined()
  make: string;

  @IsDefined()
  model: string;

  @IsDefined()
  year: number;

  @IsDefined()
  vin: string;

  @IsDefined()
  transmission: $Enums.TransmissionType;

  @IsDefined()
  color: string;

  @IsDefined()
  ownerId: string;

  @IsDefined()
  organizationId: string;

  @IsDefined()
  locationId: string;
}
