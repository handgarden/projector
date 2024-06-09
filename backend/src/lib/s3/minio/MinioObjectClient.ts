import { ConfigService } from '@nestjs/config';
import { ObjectStorageClient } from '../ObjectStorageClient';
import * as Minio from 'minio';
import { RawFile } from '../RawFile';
import { Injectable } from '@nestjs/common';
import { BucketRequiredError } from '../error/BucketRequiredError';
import { StoredFile } from '../StoredFile';

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

    this.createBucketIfNotExists();
  }

  private async createBucketIfNotExists() {
    if (!this.bucket) {
      throw new BucketRequiredError('MINIO', 'MINIO_BUCKET');
    }
    const isExists = await this.client.bucketExists(this.bucket);
    if (isExists) {
      return;
    }
    this.client.makeBucket(this.bucket, 'us-east-1');
  }

  async putObject(file: RawFile): Promise<StoredFile> {
    await this.client.putObject(this.bucket, file.key, file.buffer);

    const storedFile = new StoredFile({
      bucket: this.bucket,
      key: file.key,
      originalName: file.originalname,
      url: await this.getPresignedUrl(file.key),
    });

    return storedFile;
  }

  async getPresignedUrl(key: string): Promise<string> {
    return this.client.presignedGetObject(this.bucket, key);
  }

  async deleteObject(key: string): Promise<void> {
    return this.client.removeObject(this.bucket, key);
  }
}
