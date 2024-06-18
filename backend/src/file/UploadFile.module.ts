import { Module } from '@nestjs/common';
import { ObjectStorageModule } from '../lib/s3/ObjectStorage.module';
import { UploadFileTypeORMRepository } from './adapter/out/UploadFileTypeORMRepository';
import { UploadFileMutateUseCase } from './application/port/in/UploadFileMutateUseCase';
import { UploadFileService } from './application/service/UploadFile.service';
import { UploadFileQueryUseCase } from './application/port/in/UploadFileQueryUseCase';
import { UploadFileObjectStoragePort } from './application/port/out/UploadFileObjectStoragePort';
import { UploadObjectStorage } from './adapter/out/UploadObjectStorage';
import { UploadFilePersistencePort } from './application/port/out/UploadFilePersistencePort';
import { FileController } from './adapter/in/File.controller';
import { UploadFileQueryResolver } from './adapter/in/UploadFileQuery.resolver';
import { UploadFileBatchQueryUseCase } from './application/port/in/UploadFileBatchQueryUseCase';
import { UploadFileBatchQueryService } from './application/service/UploadFileBatchQuery.service';
import { UploadFileBatchLoadPort } from './application/port/out/UploadFileBatchLoadPort';
import { UploadFileBatchDataLoader } from './adapter/out/UploadFileBatchDataLoader';
import { UserModule } from '../user/User.module';

@Module({
  imports: [ObjectStorageModule, UserModule],
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
      provide: UploadFileBatchQueryUseCase,
      useClass: UploadFileBatchQueryService,
    },
    {
      provide: UploadFileBatchLoadPort,
      useClass: UploadFileBatchDataLoader,
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
  exports: [UploadFileBatchQueryUseCase],
})
export class UploadFileModule {}
