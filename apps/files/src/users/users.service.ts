import { AUTH_SERVICE, UPDATE_USER_LOGO } from '@app/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { getNewFileName, getS3PublicUrl } from '../utils/helpers/file.helper';

@Injectable()
export class UsersService {
  private s3Client: S3Client;

  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async upload(fileName: string, file: Buffer): Promise<string> {
    const bucket = this.configService.get('AWS_S3_BUCKET_NAME');
    const key = `${this.configService.get('AWS_S3_USER_FOLDER')}/${getNewFileName(fileName)}`;
    const region = this.configService.get('AWS_REGION');

    const result = await this.s3Client.send(
      new PutObjectCommand({ Bucket: bucket, Key: key, Body: file }),
    );

    if (result.$metadata.httpStatusCode !== 200) {
      throw new BadRequestException('Failed to upload file');
    }

    return getS3PublicUrl(bucket, key, region);
  }

  async updateUserLogo(userId: number, logo: string) {
    const message = this.authServiceClient.send(UPDATE_USER_LOGO, {
      userId,
      logo,
    });

    const result = await firstValueFrom(message);

    return result;
  }
}
