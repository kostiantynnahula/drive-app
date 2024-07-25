import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { EventPattern } from '@nestjs/microservices';
import { UPDATE_ORGANIZATION_LOGO } from '@app/common';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Controller()
export class OrganizationsEventController {
  constructor(private readonly service: OrganizationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern(UPDATE_ORGANIZATION_LOGO)
  async updateOrganizationLogo({ organizationId, logo }: UpdateLogoDto) {
    const organization = await this.service.findOne(organizationId);

    if (!organization) {
      return {
        message: 'Organization not found',
      };
    }

    return await this.service.updateOne(organizationId, { logo });
  }
}
