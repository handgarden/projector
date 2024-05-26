import { Inject, Injectable } from '@nestjs/common';
import { OAuthService } from './OAuth.service';
import { OAuthProviderNotFoundException } from '../error/OAuthProviderNotFoundError';
import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';

@Injectable()
export class OAuthFacadeService {
  constructor(
    @Inject(OAuthService) private readonly oauthServices: OAuthService[],
  ) {}

  async getToken(provider: OAuthProvider, code: string) {
    const service = await this.getOAuthService(provider);
    return service.getToken(code);
  }

  async getProfile(provider: OAuthProvider, code: string) {
    const service = await this.getOAuthService(provider);
    return service.getProfile(code);
  }

  private async getOAuthService(provider: OAuthProvider) {
    for (const service of this.oauthServices) {
      if (service.isMatchProvider(provider)) {
        return service;
      }
    }
    throw new OAuthProviderNotFoundException(provider);
  }
}
