import {
  BadRequestException,
  Controller,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { MessagePattern } from '@nestjs/microservices';
import { CarServiceEvents } from '@app/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { GetPhotosDto } from './dto/get-photos.dto';
import { DeletePhotoDto } from './dto/delete-photo.dto';
import { CarsService } from '../cars/cars.service';
import { GetPhotoDto } from './dto/get-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly service: PhotosService,
    private readonly carsService: CarsService,
  ) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern(CarServiceEvents.FIND_CAR_PHOTOS)
  async findPhotos({ carId }: GetPhotosDto) {
    const car = await this.carsService.findOne(carId);

    if (!car) {
      throw new BadRequestException('Car is invalid');
    }

    return await this.service.findMany(carId);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(CarServiceEvents.ADD_CAR_PHOTOS)
  async addPhotos({ carId, urls }: CreatePhotoDto) {
    const car = await this.carsService.findOne(carId);

    if (!car) {
      throw new BadRequestException('Car is invalid');
    }

    const data = urls.map((url) => ({ url, carId }));

    await this.service.createMany(data);

    return true;
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(CarServiceEvents.FIND_CAR_PHOTO)
  async findPhoto({ carId, photoId }: GetPhotoDto) {
    const car = await this.carsService.findOne(carId);

    if (!car) {
      throw new BadRequestException('Car is invalid');
    }

    return await this.service.findOne(carId, photoId);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(CarServiceEvents.DELETE_CAR_PHOTO)
  async deletePhotos({ carId, photoId }: DeletePhotoDto) {
    const car = await this.carsService.findOne(carId);

    if (!car) {
      throw new BadRequestException('Car is invalid');
    }

    await this.service.deleteMany(carId, photoId);

    return true;
  }
}
