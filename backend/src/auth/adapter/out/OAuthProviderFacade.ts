import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';
import { OAuthProfileDto } from '../../../lib/auth/oauth/dto/OAuthProfile';
import { OAuthFacadeService } from '../../../lib/auth/oauth/OAuthFacade.service';
import { OAuthProviderPort } from '../../application/port/out/OAuthProviderPort';

export class OAuthProviderFacade implements OAuthProviderPort {
  constructor(private readonly oauthFacadeService: OAuthFacadeService) {}
  async getOAuthProfile(
    code: string,
    provider: OAuthProvider,
  ): Promise<OAuthProfileDto> {
    return this.oauthFacadeService.getProfile(provider, code);
  }
}
