import { DomainError } from './DomainError';

export class DuplicateSequenceSlideError extends DomainError {
  constructor(projectId: number, sequence: number) {
    super(`Sequence ${sequence} Slide already exists in project ${projectId}`);
  }
}
