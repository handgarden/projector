import { Module } from '@nestjs/common';
import { S3Module } from '../../lib/s3/S3.module';
import UploadFileGqlService from './UploadFileGql.service';
import { UploadFileQueryResolver } from './resolver/UploadFileQuery.resolver';
import { UploadFileRepository } from '../../core/entity/repository/UploadFile.repository';
import { UserGqlModule } from '../user/UserGql.module';

@Module({
  imports: [S3Module, UserGqlModule],
  providers: [
    UploadFileGqlService,
    UploadFileQueryResolver,
    UploadFileRepository,
  ],
  exports: [],
})
export class UploadFileGqlModule {}
