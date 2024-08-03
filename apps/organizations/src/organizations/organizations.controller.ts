import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CurrentUser, JwtAuthGuard, User } from '@app/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organization')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async findOne(@CurrentUser() user: User) {
    if (!user.organizationId) {
      throw new NotFoundException('User does not belong to any organization');
    }

    const result = await this.organizationsService.findOne(user.organizationId);

    if (!result) {
      throw new NotFoundException('Organization not found');
    }

    return result;
  }

  @Post()
  async createOne(
    @Body() body: CreateOrganizationDto,
    @CurrentUser() user: User,
  ) {
    return await this.organizationsService.createOne(body, user.id);
  }

  @Patch()
  async updateOne(
    @Body() body: UpdateOrganizationDto,
    @CurrentUser() user: User,
  ) {
    if (!user.organizationId) {
      throw new BadRequestException('User does not belong to any organization');
    }

    const organization = await this.organizationsService.findOne(
      user.organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.organizationsService.updateOne(user.organizationId, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string, @CurrentUser() user: User) {
    if (!user.organizationId) {
      throw new BadRequestException('User does not belong to any organization');
    }

    const organization = await this.organizationsService.findOne(id);

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return await this.organizationsService.deleteOne(organization);
  }
}
