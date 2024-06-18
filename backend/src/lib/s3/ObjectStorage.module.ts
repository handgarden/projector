import { Module } from '@nestjs/common';
import { ObjectStorageClient } from './ObjectStorageClient';
import { MinioObjectClient } from './minio/MinioObjectClient';
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
  ],
  exports: [ObjectStorageClient],
})
export class ObjectStorageModule {}
