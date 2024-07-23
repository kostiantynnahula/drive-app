import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniquePhoneValidator implements ValidatorConstraintInterface {
  public message = 'phone already taken';

  constructor(private readonly service: PrismaService) {}

  async validate(phone: string): Promise<boolean> {
    return !(await this.service.user.findFirst({ where: { phone } }));
  }

  defaultMessage(): string {
    return this.message;
  }
}
