import { CustomBadRequestError } from '../../../common/filter/error/CustomBadRequestError';
import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';

export class DuplicateOAuthProfileError extends CustomBadRequestError {
  constructor({ provider }: { provider: OAuthProvider }) {
    super(`중복된 ${provider} OAuth 프로필입니다.`);
  }
}
