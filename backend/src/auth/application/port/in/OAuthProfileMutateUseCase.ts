import { UserDto } from '../../../../user/application/dto/User.dto';
import { OAuthProvider } from '../../../domain/OAuthProvider';
import { OAuthRequestDto } from '../../dto/OAuthRequest.dto';
import { OAuthProfileDto } from '../../dto/OAuthProfile.dto';

export interface OAuthProfileMutateUseCase {
  loginWithOAuthProfile(dto: OAuthRequestDto): Promise<UserDto>;
  linkOAuthProfile(
    userId: number,
    dto: OAuthRequestDto,
  ): Promise<OAuthProfileDto>;
  unlinkOAuthProfile(userId: number, provider: OAuthProvider): Promise<void>;
}

export const OAuthProfileMutateUseCase = Symbol('OAuthProfileMutateUseCase');
