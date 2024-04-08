import { Module } from '@nestjs/common';
import { UserQueryResolver } from './resolver/UserQuery.resolver';
import { UserRepository } from '../../core/entity/repository/User.repository';
import { UserGqlService } from './UserGql.service';

@Module({
  providers: [UserQueryResolver, UserRepository, UserGqlService],
})
export class UserGqlModule {}
