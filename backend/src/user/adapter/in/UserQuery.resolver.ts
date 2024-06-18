import { Query, Resolver } from '@nestjs/graphql';
import { UserResponse } from '../dto/response/User.response';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { UserQueryUseCase } from '../../application/port/in/UserQueryUseCase';
import { Inject } from '@nestjs/common';

@Resolver(() => UserResponse)
@GqlAuth()
export class UserQueryResolver {
  constructor(
    @Inject(UserQueryUseCase)
    private readonly userQueryUseCase: UserQueryUseCase,
  ) {}

  @Query((returns) => UserResponse)
  async user(@GqlUser() user: TokenUser) {
    return this.userQueryUseCase.getUser(user.id);
  }
}
