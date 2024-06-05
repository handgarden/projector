import { OAuthProvider } from '../../../../core/entity/enum/OAuthProvider';
import { AuthUserDto } from '../../dto/AuthUser.dto';
import { OAuthRequestDto } from '../../dto/OAuthRequest.dto';
import { OAuthUserProfileDto } from '../../dto/OAuthUserProfile.dto';

export interface OAuthUserProfileMutateUseCase {
  loginWithOAuthProfile(dto: OAuthRequestDto): Promise<AuthUserDto>;
  linkOAuthProfile(
    userId: number,
    dto: OAuthRequestDto,
  ): Promise<OAuthUserProfileDto>;
  unlinkOAuthProfile(userId: number, provider: OAuthProvider): Promise<void>;
}

export const OAuthUserProfileMutateUseCase = Symbol(
  'OAuthUserProfileMutateUseCase',
);
