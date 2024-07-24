import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueNameValidator implements ValidatorConstraintInterface {
  public message = 'name already taken';

  constructor(private readonly service: PrismaService) {}

  async validate(name: string): Promise<boolean> {
    return !(await this.service.organization.findFirst({ where: { name } }));
  }

  defaultMessage(): string {
    return this.message;
  }
}
