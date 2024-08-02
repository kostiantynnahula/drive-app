import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getNewFileName, getS3PublicUrl } from '../helpers/file.helper';

@Injectable()
export class S3Service {
  protected s3Client: S3Client;

  protected folder: string;

  constructor(
    protected configService: ConfigService,
    folder: string,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.folder = folder;
  }

  /**
   * Upload file to S3
   *
   * @param fileName
   * @param file
   * @returns
   */
  async upload(fileName: string, file: Buffer): Promise<string> {
    const bucket = this.configService.get('AWS_S3_BUCKET_NAME');
    const key = `${this.folder}/${getNewFileName(fileName)}`;
    const region = this.configService.get('AWS_REGION');

    const result = await this.s3Client.send(
      new PutObjectCommand({ Bucket: bucket, Key: key, Body: file }),
    );

    if (result.$metadata.httpStatusCode !== 200) {
      throw new BadRequestException('Failed to upload file');
    }

    return getS3PublicUrl(bucket, key, region);
  }

  /**
   * Uploda multiple files to S3
   * @param files
   * @returns
   */
  async uploadMultiple(
    files: { fileName: string; file: Buffer }[],
  ): Promise<string[]> {
    return Promise.all(
      files.map(async ({ fileName, file }) => this.upload(fileName, file)),
    );
  }

  /**
   * Delete file from S3
   *
   * @param {string} key
   */
  async delete(key: string): Promise<void> {
    const bucket = this.configService.get('AWS_S3_BUCKET_NAME');

    await this.s3Client.send(
      new PutObjectCommand({ Bucket: bucket, Key: key }),
    );
  }
}
