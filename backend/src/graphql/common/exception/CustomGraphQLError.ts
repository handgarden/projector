import { GraphQLErrorCode } from './GraphQLErrorCode';

export abstract class CustomGraphQLError {
  readonly message: string;
  readonly code: GraphQLErrorCode;
  constructor(message: string, code: GraphQLErrorCode) {
    this.message = message;
    this.code = code;
  }
}
