import { IsDefined } from 'class-validator';

export class UpdateLogoDto {
  @IsDefined()
  organizationId: string;

  @IsDefined()
  logo: string;
}
