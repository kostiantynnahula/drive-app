import { Inject, Injectable } from '@nestjs/common';
import { S3Service } from '../utils/services/s3.service';
import { CARS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CarsService extends S3Service {
  constructor(
    @Inject(CARS_SERVICE)
    private readonly carsServiceClient: ClientProxy,
    protected readonly configService: ConfigService,
  ) {
    super(configService, configService.get('AWS_S3_CARS_FOLDER'));
  }
}
