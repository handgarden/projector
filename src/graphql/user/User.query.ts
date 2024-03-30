import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './User.model';

@Resolver((of) => UserModel)
export class UserQueryResolver {
  @Query((returns) => UserModel)
  async user() {
    return {
      id: 1,
      account: 'admin',
      password: 'admin',
    };
  }
}
