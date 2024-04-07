import { Module } from '@nestjs/common';
import { UserQueryResolver } from './resolver/UserQuery.resolver';

@Module({
  providers: [UserQueryResolver],
})
export class UserGqlModule {}
