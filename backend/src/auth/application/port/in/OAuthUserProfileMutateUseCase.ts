import { UserDto } from '../../../../user/application/dto/User.dto';
import { OAuthProvider } from '../../../domain/OAuthProvider';
import { OAuthRequestDto } from '../../dto/OAuthRequest.dto';
import { OAuthUserProfileDto } from '../../dto/OAuthUserProfile.dto';

export interface OAuthUserProfileMutateUseCase {
  loginWithOAuthProfile(dto: OAuthRequestDto): Promise<UserDto>;
  linkOAuthProfile(
    userId: number,
    dto: OAuthRequestDto,
  ): Promise<OAuthUserProfileDto>;
  unlinkOAuthProfile(userId: number, provider: OAuthProvider): Promise<void>;
}

export const OAuthUserProfileMutateUseCase = Symbol(
  'OAuthUserProfileMutateUseCase',
);
