import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UserModel } from '../model/User.model';
import { UserGqlService } from '../UserGql.service';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { OAuthProfileModel } from '../model/OAuthProfile.model';
import { OAuthProfileLoader } from '../loader/OAuthProfile.loader';

@Resolver(() => UserModel)
@GqlAuth()
export class UserQueryResolver {
  constructor(
    private readonly userService: UserGqlService,
    private readonly oauthProfileLoader: OAuthProfileLoader,
  ) {}

  @Query((returns) => UserModel)
  async user(@GqlUser() user: TokenUser) {
    return this.userService.getUser(user.id);
  }

  @ResolveField(() => [OAuthProfileModel], { nullable: 'items' })
  async oauthProfiles(@Root() user: UserModel) {
    return this.oauthProfileLoader.findByUserId.load(user.id);
  }
}
