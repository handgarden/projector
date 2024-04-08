import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../model/User.model';
import { UserGqlService } from '../UserGql.service';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';

@Resolver(() => UserModel)
export class UserQueryResolver {
  constructor(private readonly userService: UserGqlService) {}

  @GqlAuth()
  @Query((returns) => UserModel)
  async user(@GqlUser() user: TokenUser) {
    return this.userService.getUser(user.id);
  }
}
