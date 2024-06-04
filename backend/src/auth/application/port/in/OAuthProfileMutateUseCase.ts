import { OAuthProvider } from '../../../../core/entity/enum/OAuthProvider';
import { OAuthProfileDto } from '../../../../lib/auth/oauth/dto/OAuthProfile';
import { OAuthRequestDto } from '../../dto/OAuthRequest.dto';

export interface OAuthProfileMutateUseCase {
  loginWithOAuthProfile(dto: OAuthRequestDto): Promise<void>;
  linkOAuthProfile(userId: number, dto: OAuthProfileDto): Promise<void>;
  unlinkOAuthProfile(userId: number, provider: OAuthProvider): Promise<void>;
}
