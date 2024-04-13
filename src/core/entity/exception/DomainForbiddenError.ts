import { DomainError } from './DomainError';

export class DomainForbiddenError extends DomainError {
  constructor() {
    super('You are not authorized to access this resource');
  }
}
