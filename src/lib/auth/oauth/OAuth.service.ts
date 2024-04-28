import { OAuthToken } from './dto/OAuthToken';
import { OAuthProfileDto } from './dto/OAuthProfile';

export interface OAuthService {
  getToken(code: string): Promise<OAuthToken>;
  profile(accessToken: string): Promise<OAuthProfileDto>;
}
