import { Controller, Get } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller()
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async list() {
    return [];
  }
}
