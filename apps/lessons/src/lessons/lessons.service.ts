import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private readonly prismaService: PrismaService) {}
}