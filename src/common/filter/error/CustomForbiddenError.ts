import { CustomError } from './CustomError';

export class CustomForbiddenError extends CustomError {
  constructor() {
    super('접근 권한이 없습니다.');
  }
}
