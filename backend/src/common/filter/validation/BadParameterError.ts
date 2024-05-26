import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomValidationError } from './CustomValidationError';

export class BadParameterError extends BadRequestException {
  constructor(...validationErrors: ValidationError[]) {
    super(validationErrors.map((v) => new CustomValidationError(v)));
  }
}
