import { ValidationError } from '@nestjs/common';

export class CustomValidationError {
  property: string;
  value: any;
  constraints: Constraint[];

  constructor(validationError: ValidationError) {
    this.property = validationError.property;
    this.value = validationError.value;
    if (validationError.constraints) {
      this.constraints = Object.entries(validationError.constraints).map(
        (entry) => new Constraint(entry[0], entry[1]),
      );
    }
  }
}

class Constraint {
  type: string;
  message: string;

  constructor(type: string, message: string) {
    this.type = type;
    this.message = message;
  }
}
