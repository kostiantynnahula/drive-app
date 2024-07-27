import { IsDefined } from 'class-validator';

export class TokenDto {
  @IsDefined()
  token: string;
}
