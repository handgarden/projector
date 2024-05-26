import { Module } from '@nestjs/common';
import { FileApiController } from './FileApiController';
import { FileApiService } from './FileApiService';
import { S3Module } from 'src/lib/s3/S3.module';
import { UploadFileRepository } from 'src/core/entity/repository/UploadFile.repository';

@Module({
  imports: [S3Module],
  controllers: [FileApiController],
  providers: [FileApiService, UploadFileRepository],
  exports: [],
})
export class FileApiModule {}
