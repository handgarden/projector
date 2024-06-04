import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';

export class OAuthRequestDto {
  provider: OAuthProvider;
  code: string;
}
