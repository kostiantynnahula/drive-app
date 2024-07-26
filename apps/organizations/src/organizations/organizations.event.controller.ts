import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { EventPattern } from '@nestjs/microservices';
import { OrganizationServiceEvents } from '@app/common';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Controller()
export class OrganizationsEventController {
  constructor(private readonly service: OrganizationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern(OrganizationServiceEvents.UPDATE_ORGANIZATION_LOGO)
  async updateOrganizationLogo({ organizationId, logo }: UpdateLogoDto) {
    const organization = await this.service.findOne(organizationId);

    if (!organization) {
      return {
        message: 'Organization not found',
      };
    }

    return await this.service.updateOne(organizationId, { logo });
  }

  @UsePipes(new ValidationPipe())
  @EventPattern(OrganizationServiceEvents.FIND_ORGANIZATION)
  async findOrganization({ organizationId }: { organizationId: string }) {
    const organiation = await this.service.findOne(organizationId);

    if (!organiation) {
      return {
        message: 'Organization not found',
      };
    }

    return organiation;
  }
}
