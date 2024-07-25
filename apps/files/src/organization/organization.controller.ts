import { Controller, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @Post('upload/:id/logo')
  async uploadLogo() {
    // upload logo

    return await this.service.updateOrganizationLogo('1', 'path');
  }
}
