import { Module } from '@nestjs/common';
import { UserQueryResolver } from '../../user/adapter/in/UserQuery.resolver';
import { UserRepository } from '../../core/entity/repository/User.repository';
import { UserGqlService } from './UserGql.service';
import { OAuthProfileLoader } from './loader/OAuthProfile.loader';
import { OAuthProfileRepository } from '../../core/entity/repository/OAuthProfile.repository';
import { UserLoader } from './loader/User.loader';
import { ProjectRepository } from '../../core/entity/repository/Project.repository';
import { UploadFileRepository } from '../../core/entity/repository/UploadFile.repository';

@Module({
  providers: [
    UserQueryResolver,
    UserRepository,
    UserGqlService,
    OAuthProfileLoader,
    OAuthProfileRepository,
    UserLoader,
    ProjectRepository,
    UploadFileRepository,
  ],
  exports: [UserLoader],
})
export class UserGqlModule {}
