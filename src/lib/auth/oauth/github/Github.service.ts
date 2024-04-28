import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GITHUB_AUTH_SCOPE, GithubTokenResponse } from './GithubAuth';
import { OAuthService } from '../OAuth.service';
import { OAuthToken } from '../dto/OAuthToken';
import { OAuthProfileDto } from '../dto/OAuthProfile';
import { GithubProfile } from './GithubProfile';

@Injectable()
export class GithubOAuthService implements OAuthService {
  constructor(private readonly configService: ConfigService) {}

  async getToken(code: string) {
    const query = new URLSearchParams();
    query.set(
      'client_id',
      this.configService.get<string>('GITHUB_CLIENT_ID') ?? '',
    );
    query.set(
      'client_secret',
      this.configService.get<string>('GITHUB_CLIENT_SECRET') ?? '',
    );
    query.set('code', code);

    try {
      const response = await fetch(
        `https://github.com/login/oauth/access_token?${query.toString()}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
        },
      );
      const data: GithubTokenResponse | { error: string } =
        await response.json();

      if (
        'error' in data ||
        !data.scope.includes(GITHUB_AUTH_SCOPE.user.email) ||
        !data.scope.includes(GITHUB_AUTH_SCOPE.user.read)
      ) {
        throw new UnauthorizedException();
      }

      return OAuthToken.fromAccessOnly(data.access_token);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  async profile(accessToken: string) {
    try {
      const userResponse = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });
      const user: GithubProfile = await userResponse.json();

      return OAuthProfileDto.fromGithub(user);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
