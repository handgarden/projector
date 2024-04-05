import { ConfigService } from '@nestjs/config';
import { ObjectStorageClient } from '../ObjectStorageClient';
import * as Minio from 'minio';
import { RawFile } from '../RawFile';
import { UploadFile } from 'src/core/entity/domain/UploadFile.entity';
import { Injectable } from '@nestjs/common';
import { BucketRequiredError } from '../error/BucketRequiredError';

@Injectable()
export class MinioObjectClient implements ObjectStorageClient {
  private client: Minio.Client;
  private bucket: string;
  constructor(configService: ConfigService) {
    this.client = new Minio.Client({
      endPoint: configService.get<string>('MINIO_ENDPOINT') ?? '',
      port: Number(configService.get<string>('MINIO_PORT') ?? 9000),
      useSSL: configService.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: configService.get<string>('S3_ACCESS_KEY') ?? '',
      secretKey: configService.get<string>('S3_SECRET_KEY') ?? '',
    });
    this.bucket = configService.get<string>('MINIO_BUCKET') ?? '';

    this.checkBucket();

    this.checkBucketExists();
  }

  private checkBucket() {
    if (!this.bucket) {
      throw new BucketRequiredError('MINIO', 'MINIO_BUCKET');
    }
  }
  private async checkBucketExists() {
    const isExists = await this.client.bucketExists(this.bucket);
    if (isExists) {
      return;
    }
    this.client.makeBucket(this.bucket, 'us-east-1');
  }

  async getPresignedObjectUrl(bucket: string, key: string): Promise<any> {
    return this.client.presignedGetObject(bucket, key);
  }

  async putObject(file: RawFile): Promise<UploadFile> {
    console.log('putObject', file.key, file.buffer.length, this.bucket);
    await this.client.putObject(this.bucket, file.key, file.buffer);

    const uploadFile = new UploadFile();
    uploadFile.fileKey = file.key;
    uploadFile.bucket = this.bucket;
    uploadFile.originalName = file.key;

    return uploadFile;
  }

  async deleteObject(bucket: string, key: string): Promise<any> {
    return this.client.removeObject(bucket, key);
  }
}
