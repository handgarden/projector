import {
  ValidationConstraint,
  ValidationError,
} from "../api/ValidationError.type";

type DuplicateAccountConstraint = ValidationConstraint<"isUnique">;

export type DuplicateAccountError = ValidationError<
  "account",
  string,
  DuplicateAccountConstraint
>;
