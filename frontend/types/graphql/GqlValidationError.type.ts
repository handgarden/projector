import { ValidationError } from "../api/ValidationError.type";

export type GqlValidationError = {
  code: string;
  message: string;
  data: ValidationError[];
};

