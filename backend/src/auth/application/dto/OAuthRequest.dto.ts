import { OAuthProvider } from '../../domain/OAuthProvider';

export class OAuthRequestDto {
  provider: OAuthProvider;
  code: string;

  constructor(provider: OAuthProvider, code: string) {
    this.provider = provider;
    this.code = code;
  }
}
