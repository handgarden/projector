import { OAuthProvider } from '../../../../core/entity/enum/OAuthProvider';
import { OAuthProfileDto } from '../../../../lib/auth/oauth/dto/OAuthProfile';

export interface OAuthProviderPort {
  getOAuthProfile(
    code: string,
    provider: OAuthProvider,
  ): Promise<OAuthProfileDto>;
}

export const OAuthProviderPort = Symbol('OAuthProviderPort');
