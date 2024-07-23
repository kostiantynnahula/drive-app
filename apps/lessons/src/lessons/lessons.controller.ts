import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  async list() {
    return [];
  }

  @Get(':id')
  async item() {
    return {};
  }

  @Post()
  async create() {
    return {};
  }

  @Patch(':id')
  async update() {
    return {};
  }

  @Delete(':id')
  async delete() {
    return {};
  }
}
