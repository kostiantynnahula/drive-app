import { BadRequestException, Controller } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create.dto';
import { UpdateCarDto } from './dto/update.dto';
import { UsersService } from '../users/users.service';
import { MessagePattern } from '@nestjs/microservices';
import { CarServiceEvents } from '@app/common';
import { OrganizationDto } from './dto/organization.dto';
import { OrganizationCarDto } from './dto/organization-car.dto';
import { OrganizationCarsService } from './organization-cars.service';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly organizationCarsServuce: OrganizationCarsService,
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern(CarServiceEvents.FIND_ORGANIZATION_CARS)
  async getMany({ organizationId }: OrganizationDto) {
    return await this.organizationCarsServuce.findMany(organizationId);
  }

  @MessagePattern(CarServiceEvents.FIND_ORGANIZATION_CAR)
  async getOne({ organizationId, carId }: OrganizationCarDto) {
    console.log('get one car');
    return await this.organizationCarsServuce.findOne(carId, organizationId);
  }

  @MessagePattern(CarServiceEvents.ADD_ORGANIZATION_CAR)
  async createOne(body: CreateCarDto) {
    const { ownerId, organizationId } = body;

    const user = await this.usersService.findOneByOrganization(
      ownerId,
      organizationId,
    );

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.carsService.createOne(body);
  }

  @MessagePattern(CarServiceEvents.UPDATE_ORGANIZATION_CAR)
  async updateOne(body: UpdateCarDto) {
    const { carId, organizationId } = body;

    return await this.organizationCarsServuce.updateOne(
      carId,
      organizationId,
      body,
    );
  }

  @MessagePattern(CarServiceEvents.DELETE_ORGANIZATION_CAR)
  async deleteOne({ carId, organizationId }: OrganizationCarDto) {
    return await this.organizationCarsServuce.deleteOne(carId, organizationId);
  }
}
