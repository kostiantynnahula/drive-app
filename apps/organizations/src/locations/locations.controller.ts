import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create.dto';
import { UpdateLocationDto } from './dto/update.dto';
import { OrganizationsService } from './../organizations/organizations.service';
import { SearchQuery } from './dto/saerch.query';

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly organizationService: OrganizationsService,
  ) {}

  @Get(':organizationId')
  async getMany(
    @Param('organizationId') organizationId: string,
    @Query() query: SearchQuery,
  ) {
    const organization = await this.organizationService.findOne(organizationId);

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    return await this.locationsService.findMany(organizationId, query);
  }

  @Get(':organizationId/:locationId')
  async getOne(
    @Param('organizationId') organizationId: string,
    @Param('locationId') locationId: string,
  ) {
    const organization = await this.organizationService.findOne(organizationId);

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    return await this.locationsService.findOne(organizationId, locationId);
  }

  @Post(':organizationId')
  async createOne(
    @Param('organizationId') organizationId: string,
    @Body() data: CreateLocationDto,
  ) {
    return await this.locationsService.createOne(organizationId, data);
  }

  @Post(':organizationId/:locationId')
  async updateOne(
    @Param('organizationId') organizationId: string,
    @Param('locationId') locationId: string,
    @Body() data: UpdateLocationDto,
  ) {
    return await this.locationsService.updateOne(
      organizationId,
      locationId,
      data,
    );
  }

  @Delete(':organizationId/:locationId')
  async deleteOne(
    @Param('organizationId') organizationId: string,
    @Param('locationId') locationId: string,
  ) {
    return await this.locationsService.deleteOne(organizationId, locationId);
  }
}
