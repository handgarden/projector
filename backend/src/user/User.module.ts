import { Module } from '@nestjs/common';
import { UserBatchQueryUseCase } from './application/port/in/UserBatchQueryUseCase';
import { UserBatchQueryService } from './application/service/UserBatchQuery.service';
import { UserQueryService } from './application/service/UserQuery.service';
import { UserQueryUseCase } from './application/port/in/UserQueryUseCase';
import { UserBatchQueryPort } from './application/port/out/UserBatchQueryPort';
import { UserBatchDataLoader } from './adapter/out/UserBatchDataLoader';
import { UserPersistencePort } from './application/port/out/UserPersistencePort';
import { UserTypeORMRepository } from './adapter/out/UserTypeORM.repository';
import { UserQueryResolver } from './adapter/in/UserQuery.resolver';
import { UserMutateUseCase } from './application/port/in/UserMutateUseCase';
import { UserMutateService } from './application/service/UserMutate.service';

@Module({
  imports: [],
  providers: [
    {
      provide: UserBatchQueryUseCase,
      useClass: UserBatchQueryService,
    },
    {
      provide: UserQueryUseCase,
      useClass: UserQueryService,
    },
    {
      provide: UserBatchQueryPort,
      useClass: UserBatchDataLoader,
    },
    {
      provide: UserPersistencePort,
      useClass: UserTypeORMRepository,
    },
    {
      provide: UserMutateUseCase,
      useClass: UserMutateService,
    },
    UserQueryResolver,
  ],
  exports: [UserBatchQueryPort, UserQueryUseCase, UserMutateUseCase],
})
export class UserModule {}
