export class OAuthToken {
  accessToken: string;
  refreshToken?: string;

  static fromAccessOnly(accessToken: string): OAuthToken {
    const token = new OAuthToken();
    token.accessToken = accessToken;
    return token;
  }

  static from(accessToken: string, refreshToken: string): OAuthToken {
    const token = new OAuthToken();
    token.accessToken = accessToken;
    token.refreshToken = refreshToken;
    return token;
  }
}
