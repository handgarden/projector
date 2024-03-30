import { Module } from '@nestjs/common';
import { UserQueryResolver } from './User.query';

@Module({
  providers: [UserQueryResolver],
})
export class UserGqlModule {}
