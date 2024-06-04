import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';
import { OAuthProfileDto } from '../../../lib/auth/oauth/dto/OAuthProfile';
import { OAuthRequestDto } from '../dto/OAuthRequest.dto';
import { OAuthProfileMutateUseCase } from '../port/in/OAuthProfileMutateUseCase';
import { OAuthProviderPort } from '../port/out/OAuthProviderPort';

export class OAuthService implements OAuthProfileMutateUseCase {
  constructor(private readonly oauthProviderPort: OAuthProviderPort) {}
  loginWithOAuthProfile(dto: OAuthRequestDto): Promise<void> {
    return;
  }
  linkOAuthProfile(userId: number, dto: OAuthProfileDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  unlinkOAuthProfile(userId: number, provider: OAuthProvider): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
