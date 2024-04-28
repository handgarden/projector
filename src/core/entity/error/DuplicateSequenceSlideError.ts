import { CustomBadRequestError } from '../../../common/filter/error/CustomBadRequestError';

export class DuplicateSequenceSlideError extends CustomBadRequestError {
  constructor(projectId: number, sequence: number) {
    super(`Sequence ${sequence} Slide already exists in project ${projectId}`);
  }
}
