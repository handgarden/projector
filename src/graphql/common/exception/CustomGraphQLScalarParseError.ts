export class CustomGraphQLScalarParseError extends Error {
  constructor(type: string, value: any) {
    super(`Failed to parse ${type} scalar value: ${value}`);
  }
}
