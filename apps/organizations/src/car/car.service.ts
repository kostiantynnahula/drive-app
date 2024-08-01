import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CARS_SERVICE, CarServiceEvents, Car } from '@app/common';
import { firstValueFrom } from 'rxjs';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { GetManyDto } from './dto/get-many.dto';

@Injectable()
export class CarService {
  constructor(
    @Inject(CARS_SERVICE)
    private readonly carsServiceClient: ClientProxy,
  ) {}

  /**
   * Find all cars
   *
   * @returns {Promise<Car[]>}
   */
  async findAll(payload: GetManyDto): Promise<Car[]> {
    const message = await this.carsServiceClient.send(
      CarServiceEvents.FIND_ORGANIZATION_CARS,
      payload,
    );

    return await firstValueFrom(message);
  }

  async findOne(organizationId: string, carId: string): Promise<Car[]> {
    const message = await this.carsServiceClient.send(
      CarServiceEvents.FIND_ORGANIZATION_CAR,
      { organizationId, carId },
    );

    return await firstValueFrom(message);
  }

  async findOneByOwner(
    organizationId: string,
    ownerId: string,
  ): Promise<Car[]> {
    console.log('send by owner', { organizationId, ownerId });
    const message = await this.carsServiceClient.send(
      CarServiceEvents.FIND_ORGANIZATION_CAR_BY_OWNER,
      { organizationId, ownerId },
    );

    return await firstValueFrom(message);
  }

  async create(organizationId: string, data: CreateCarDto) {
    const message = await this.carsServiceClient.send(
      CarServiceEvents.ADD_ORGANIZATION_CAR,
      { organizationId, ...data },
    );

    return await firstValueFrom(message);
  }

  async update(organizationId: string, carId: string, data: UpdateCarDto) {
    const message = await this.carsServiceClient.send(
      CarServiceEvents.UPDATE_ORGANIZATION_CAR,
      { organizationId, carId, ...data },
    );

    return await firstValueFrom(message);
  }

  async delete(organizationId: string, carId: string) {
    const message = await this.carsServiceClient.send(
      CarServiceEvents.DELETE_ORGANIZATION_CAR,
      { organizationId, carId },
    );

    return await firstValueFrom(message);
  }
}
