import { CustomError } from '../../../common/filter/error/CustomError';

export class OAuthProviderNotFoundException extends CustomError {
  constructor(provider: string) {
    super(`OAuth provider not found: ${provider}`);
  }
}
