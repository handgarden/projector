import { CustomError } from './CustomError';

export class CustomForbiddenError extends CustomError {
  constructor() {
    super('You are not authorized to access this resource');
  }
}
