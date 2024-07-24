import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  public message = 'email already taken';

  constructor(private readonly service: PrismaService) {}

  async validate(email: string): Promise<boolean> {
    return !(await this.service.organization.findFirst({ where: { email } }));
  }

  defaultMessage(): string {
    return this.message;
  }
}
