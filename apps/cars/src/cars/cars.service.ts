import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarsService {
  constructor(private readonly prismaSerice: PrismaService) {}

  async getMany() {}

  async getOne() {}

  async createOne() {}

  async updateOne() {}

  async deleteOne() {}
}
