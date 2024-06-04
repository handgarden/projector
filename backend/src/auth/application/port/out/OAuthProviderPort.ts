import { OAuthProvider } from '../../../../core/entity/enum/OAuthProvider';

export interface OAuthProviderPort {
  getOAuthProfile(code: string, provider: OAuthProvider): Promise<any>;
}
