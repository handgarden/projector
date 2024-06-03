import { Module } from '@nestjs/common';
import { ProjectMutationResolver } from './adapter/in/ProjectMutation.resolver';
import { ProjectQueryResolver } from './adapter/in/ProjectQuery.resolver';
import { SlideMutationResolver } from './adapter/in/SlideMutation.resolver';
import { SlideQueryResolver } from './adapter/in/SlideQuery.resolver';
import { ProjectMutateUseCase } from './application/ports/in/ProjectMutateUseCase';
import { ProjectMutateService } from './application/service/ProjectMutate.service';
import { ProjectQueryUseCase } from './application/ports/in/ProjectQueryUseCase';
import { ProjectQueryService } from './application/service/ProjectQuery.service';
import { SlideBatchQueryUseCase } from './application/ports/in/SlideBatchQueryUseCase';
import { SlideBatchQueryService } from './application/service/SlideBatchQuery.service';
import { SlideBatchDataLoader } from './adapter/out/SlideBatchDataLoader';
import { SlideBatchLoadPort } from './application/ports/out/SlideBatchLoadPort';
import { ProjectPersistencePort } from './application/ports/out/ProjectPersistencePort';
import { ProjectTypeORMRepository } from './adapter/out/ProjectTypeOrm.repository';
import { SlideQueryUseCase } from './application/ports/in/SlideQueryUseCase';
import { SlideQueryService } from './application/service/SlideQuery.service';
import { UserModule } from '../user/User.module';

@Module({
  imports: [UserModule],
  providers: [
    ProjectMutationResolver,
    ProjectQueryResolver,
    SlideMutationResolver,
    SlideQueryResolver,
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
      useClass: ProjectMutateService,
    },
    {
      provide: ProjectQueryUseCase,
      useClass: ProjectQueryService,
    },
    {
      provide: SlideBatchQueryUseCase,
      useClass: SlideBatchQueryService,
    },
    {
      provide: SlideQueryUseCase,
      useClass: SlideQueryService,
    },
  ],
  exports: [],
})
export class ProjectModule {}
