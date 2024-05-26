export type ValidationConstraint<T = string, M = string> = {
  type: T;
  message: M;
};

export type ValidationError<
  P = string,
  V = any,
  C extends ValidationConstraint<any, any> = ValidationConstraint
> = {
  property: P;
  value: V;
  constraints: C[];
};
