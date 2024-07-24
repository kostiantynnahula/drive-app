import { Controller } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { PaginationQuery } from '@app/common';
import { CreateLocationDto } from './dto/create.dto';
import { UpdateLocationDto } from './dto/update.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  async getMany(query: PaginationQuery) {
    return await this.locationsService.findMany(query);
  }

  async getOne(id: string) {
    return await this.locationsService.findOne(id);
  }

  async createOne(data: CreateLocationDto) {
    return await this.locationsService.createOne(data);
  }

  async updateOne(id: string, data: UpdateLocationDto) {
    return await this.locationsService.updateOne(id, data);
  }

  async deleteOne(id: string) {
    return await this.locationsService.deleteOne(id);
  }
}
