import { Module } from '@nestjs/common';
import { ProjectMutationResolver } from './adapter/in/ProjectMutation.resolver';
import { ProjectQueryResolver } from './adapter/in/ProjectQuery.resolver';
import { SlideMutationResolver } from './adapter/in/SlideMutation.resolver';
import { SlideQueryResolver } from './adapter/in/SlideQuery.resolver';
import { ProjectMutateUseCase } from './application/port/in/ProjectMutateUseCase';
import { ProjectQueryUseCase } from './application/port/in/ProjectQueryUseCase';
import { ProjectService } from './application/service/Project.service';
import { SlideBatchQueryUseCase } from './application/port/in/SlideBatchQueryUseCase';
import { SlideBatchQueryService } from './application/service/SlideBatchQuery.service';
import { SlideBatchDataLoader } from './adapter/out/SlideBatchDataLoader';
import { SlideBatchLoadPort } from './application/port/out/SlideBatchLoadPort';
import { ProjectPersistencePort } from './application/port/out/ProjectPersistencePort';
import { ProjectTypeORMRepository } from './adapter/out/ProjectTypeOrm.repository';
import { SlideQueryUseCase } from './application/port/in/SlideQueryUseCase';
import { SlideService } from './application/service/Slide.service';
import { UserModule } from '../user/User.module';
import { UploadFileModule } from '../file/UploadFile.module';
import { SlidePersistencePort } from './application/port/out/SlidePersistencePort';
import { SlideTypeORMRepository } from './adapter/out/SlideTypeORM.repository';
import { SlideImageQueryResolver } from './adapter/in/SlideImageQuery.resolver';

@Module({
  imports: [UserModule, UploadFileModule],
  providers: [
    ProjectMutationResolver,
    ProjectQueryResolver,
    SlideMutationResolver,
    SlideQueryResolver,
    SlideImageQueryResolver,
    {
      provide: SlideBatchLoadPort,
      useClass: SlideBatchDataLoader,
    },
    {
      provide: ProjectPersistencePort,
      useClass: ProjectTypeORMRepository,
    },
    {
      provide: ProjectMutateUseCase,
      useClass: ProjectService,
    },
    {
      provide: ProjectQueryUseCase,
      useClass: ProjectService,
    },
    {
      provide: SlideBatchQueryUseCase,
      useClass: SlideBatchQueryService,
    },
    {
      provide: SlideQueryUseCase,
      useClass: SlideService,
    },
    {
      provide: SlideBatchLoadPort,
      useClass: SlideBatchDataLoader,
    },
    {
      provide: SlidePersistencePort,
      useClass: SlideTypeORMRepository,
    },
  ],
  exports: [],
})
export class ProjectModule {}
