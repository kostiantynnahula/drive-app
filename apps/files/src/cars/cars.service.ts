import { Inject, Injectable } from '@nestjs/common';
import { S3Service } from '../utils/services/s3.service';
import { CARS_SERVICE, CarServiceEvents, File, Photo } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CarsService extends S3Service {
  constructor(
    @Inject(CARS_SERVICE)
    private readonly carsServiceClient: ClientProxy,
    protected readonly configService: ConfigService,
  ) {
    super(configService, configService.get('AWS_S3_CARS_FOLDER'));
  }

  async uploadPhoto(files: File[]): Promise<string[]> {
    const uploadDetailPairs = files.map((file) => ({
      fileName: file.originalname,
      file: file.buffer,
    }));

    return await this.uploadMultiple(uploadDetailPairs);
  }

  async addCarPhoto(carId: string, urls: string[]): Promise<void> {
    console.log('add car photo sent', carId, urls);

    const message = await this.carsServiceClient.send(
      CarServiceEvents.ADD_CAR_PHOTOS,
      {
        carId,
        urls,
      },
    );

    return await firstValueFrom(message);
  }

  async findCarPhotos(carId: string): Promise<Photo> {
    const message = await this.carsServiceClient.send(
      CarServiceEvents.FIND_CAR_PHOTOS,
      {
        carId,
      },
    );

    return await firstValueFrom(message);
  }

  async findCarPhoto(carId: string, photoId: string): Promise<Photo> {
    const message = await this.carsServiceClient.send(
      CarServiceEvents.FIND_CAR_PHOTO,
      {
        carId,
        photoId,
      },
    );

    return await firstValueFrom(message);
  }

  async deleteCarPhoto(carId: string, photoId: string) {
    const message = await this.carsServiceClient.send(
      CarServiceEvents.DELETE_CAR_PHOTO,
      {
        carId,
        photoId,
      },
    );

    return await firstValueFrom(message);
  }
}
