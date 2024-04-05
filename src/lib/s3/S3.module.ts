import { Module } from '@nestjs/common';
import { ObjectStorageClient } from './ObjectStorageClient';
import { MinioObjectClient } from './minio/MinioObjectClient';
import { S3Service } from './S3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: ObjectStorageClient,
      useFactory: (configService: ConfigService) => {
        return new MinioObjectClient(configService);
      },
      inject: [ConfigService],
    },
    S3Service,
  ],
  exports: [S3Service],
})
export class S3Module {}
