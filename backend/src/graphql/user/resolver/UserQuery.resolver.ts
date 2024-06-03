import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UserResponse } from '../../../user/adapter/dto/response/User.response';
import { UserGqlService } from '../UserGql.service';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { OAuthProfileResponse } from '../response/OAuthProfile.response';
import { OAuthProfileLoader } from '../loader/OAuthProfile.loader';

@Resolver(() => UserResponse)
@GqlAuth()
export class UserQueryResolver {
  constructor(
    private readonly userService: UserGqlService,
    private readonly oauthProfileLoader: OAuthProfileLoader,
  ) {}

  @Query((returns) => UserResponse)
  async user(@GqlUser() user: TokenUser) {
    return this.userService.getUser(user.id);
  }

  @ResolveField(() => [OAuthProfileResponse], { nullable: 'items' })
  async oauthProfiles(@Root() user: UserResponse) {
    const profiles = await this.oauthProfileLoader.findByUserId.load(user.id);
    return profiles;
  }
}
