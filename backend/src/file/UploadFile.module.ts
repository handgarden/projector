import { Module } from '@nestjs/common';
import { ObjectStorageModule } from '../lib/s3/ObjectStorage.module';
import { UploadFileTypeORMRepository } from './application/adapter/out/UploadFileTypeORMRepository';
import { UploadFileMutateUseCase } from './application/port/in/UploadFileMutateUseCase';
import { UploadFileService } from './application/service/UploadFile.service';
import { UploadFileQueryUseCase } from './application/port/in/UploadFileQueryUseCase';
import { UploadFileObjectStoragePort } from './application/port/out/UploadFileObjectStoragePort';
import { UploadObjectStorage } from './application/adapter/out/UploadObjectStorage';
import { UploadFilePersistencePort } from './application/port/out/UploadFilePersistencePort';
import { FileController } from './application/adapter/in/File.controller';
import { UploadFileQueryResolver } from './application/adapter/in/UploadFileQuery.resolver';

@Module({
  imports: [ObjectStorageModule],
  controllers: [FileController],
  providers: [
    UploadFileQueryResolver,
    {
      provide: UploadFileMutateUseCase,
      useClass: UploadFileService,
    },
    {
      provide: UploadFileQueryUseCase,
      useClass: UploadFileService,
    },
    {
      provide: UploadFileObjectStoragePort,
      useClass: UploadObjectStorage,
    },
    {
      provide: UploadFilePersistencePort,
      useClass: UploadFileTypeORMRepository,
    },
  ],
  exports: [],
})
export class UploadFileModule {}
