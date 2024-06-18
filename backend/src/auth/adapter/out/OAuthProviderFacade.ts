import { OAuthFacadeService } from '../../../lib/auth/oauth/OAuthFacade.service';
import { OAuthProviderPort } from '../../application/port/out/OAuthProviderPort';
import { OAuthProvider } from '../../domain/OAuthProvider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthProviderFacade implements OAuthProviderPort {
  constructor(private readonly oauthProviderService: OAuthFacadeService) {}
  getOAuthProfile(code: string, provider: OAuthProvider) {
    return this.oauthProviderService.getProfile(provider, code);
  }
}
