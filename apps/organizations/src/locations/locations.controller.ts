import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { OrganizationsService } from './../organizations/organizations.service';
import { SearchQuery } from './dto/search.query';
import {
  CurrentUser,
  hasUserOrganization,
  JwtAuthGuard,
  User,
} from '@app/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly organizationService: OrganizationsService,
  ) {}

  @Get()
  async findMany(@CurrentUser() user: User, @Query() query: SearchQuery) {
    hasUserOrganization(user);

    const organization = await this.organizationService.findOne(
      user.organizationId,
    );

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    return await this.locationsService.findMany(user.organizationId, query);
  }

  @Get(':locationId')
  async findOne(
    @CurrentUser() user: User,
    @Param('locationId') locationId: string,
  ) {
    const organization = await this.organizationService.findOne(
      user.organizationId,
    );

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    return await this.locationsService.findOne(user.organizationId, locationId);
  }

  @Post()
  async createOne(@CurrentUser() user: User, @Body() data: CreateLocationDto) {
    hasUserOrganization(user);

    return await this.locationsService.createOne(user.organizationId, data);
  }

  @Post(':locationId')
  async updateOne(
    @CurrentUser() user: User,
    @Param('locationId') locationId: string,
    @Body() data: UpdateLocationDto,
  ) {
    hasUserOrganization(user);

    return await this.locationsService.updateOne(
      user.organizationId,
      locationId,
      data,
    );
  }

  @Delete(':locationId')
  async deleteOne(
    @CurrentUser() user: User,
    @Param('locationId') locationId: string,
  ) {
    hasUserOrganization(user);

    return await this.locationsService.deleteOne(
      user.organizationId,
      locationId,
    );
  }
}
