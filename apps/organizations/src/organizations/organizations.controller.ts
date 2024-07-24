import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create.dto';
import { UpdateOrganizationDto } from './dto/update.dto';
import { PaginationQuery } from '@app/common';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async getMany(@Query() query: PaginationQuery) {
    return await this.organizationsService.findMany(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.organizationsService.findOne(id);

    if (!result) {
      throw new NotFoundException('Organization not found');
    }

    return result;
  }

  @Post()
  async createOne(@Body() body: CreateOrganizationDto) {
    return await this.organizationsService.createOne(body);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateOrganizationDto,
  ) {
    return await this.organizationsService.updateOne(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.organizationsService.deleteOne(id);
  }
}
