import { CustomBadRequestError } from '../../../common/filter/error/CustomBadRequestError';

export class DuplicateOAuthProfileError extends CustomBadRequestError {
  constructor({ provider, userId }) {
    super(`중복된 ${provider} OAuth 프로필입니다. (userId: ${userId})`);
  }
}
