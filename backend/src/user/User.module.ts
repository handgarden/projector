import { Module } from '@nestjs/common';
import { UserBatchQueryUseCase } from './application/port/in/UserBatchQueryUseCase';
import { UserBatchQueryService } from './application/service/UserBatchQuery.service';
import { UserQueryService } from './application/service/UserQueryService';
import { UserQueryUseCase } from './application/port/in/UserQueryUseCase';
import { UserBatchQueryPort } from './application/port/out/UserBatchQueryPort';
import { UserBatchDataLoader } from './adapter/out/UserBatchDataLoader';
import { UserPersistencePort } from './application/port/out/UserPersistencePort';
import { UserTypeORMRepository } from './adapter/out/UserTypeORM.repository';
import { UserQueryResolver } from './adapter/in/UserQuery.resolver';

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
    UserQueryResolver,
  ],
  exports: [UserBatchQueryPort],
})
export class UserModule {}
