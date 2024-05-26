import { CustomError } from './CustomError';

export class CustomBadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
