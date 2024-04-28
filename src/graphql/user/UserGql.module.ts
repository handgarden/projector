import { Module } from '@nestjs/common';
import { UserQueryResolver } from './resolver/UserQuery.resolver';
import { UserRepository } from '../../core/entity/repository/User.repository';
import { UserGqlService } from './UserGql.service';
import { OAuthProfileLoader } from './loader/OAuthProfile.loader';
import { OAuthProfileRepository } from '../../core/entity/repository/OAuthProfile.repository';

@Module({
  providers: [
    UserQueryResolver,
    UserRepository,
    UserGqlService,
    OAuthProfileLoader,
    OAuthProfileRepository,
  ],
})
export class UserGqlModule {}
