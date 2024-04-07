import { Module } from '@nestjs/common';
import { S3Module } from '../../lib/s3/S3.module';
import UploadFileGqlService from './UploadFileGql.service';
import { UploadFileQueryResolver } from './resolver/UploadFileQuery.resolver';
import { UploadFileLoader } from './loader/UploadFIleLoader';
import { UploadFileRepository } from '../../core/entity/repository/UploadFile.repository';

@Module({
  imports: [S3Module],
  providers: [
    UploadFileGqlService,
    UploadFileQueryResolver,
    UploadFileLoader,
    UploadFileRepository,
  ],
  exports: [],
})
export class UploadFileGqlModule {}
