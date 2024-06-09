import { Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { OAuthProfileQueryUseCase } from '../../application/port/in/OAuthProfileQueryUseCase';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { OAuthProfileResponse } from '../dto/OAuthProfile.response';

@Resolver(() => OAuthProfileResponse)
export class OAuthProfileQueryResolver {
  constructor(
    @Inject(OAuthProfileQueryUseCase)
    private readonly oauthProfileQueryUseCase: OAuthProfileQueryUseCase,
  ) {}

  @GqlAuth()
  @Query(() => [OAuthProfileResponse])
  async oauthProfiles(
    @GqlUser() user: TokenUser,
  ): Promise<OAuthProfileResponse[]> {
    const dtos = await this.oauthProfileQueryUseCase.getOAuthProfiles(user.id);
    return dtos.map((dto) => OAuthProfileResponse.fromDto(dto));
  }
}
