import { OAuthToken } from './dto/OAuthToken';
import { OAuthProfileDto } from './dto/OAuthProfile';

export interface OAuthService {
  isMatchProvider(provider: string): boolean;
  getToken(code: string): Promise<OAuthToken>;
  getProfile(accessToken: string): Promise<OAuthProfileDto>;
}

export const OAuthService = Symbol('OAuthService');
