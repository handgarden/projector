import { GraphQLErrorCode } from './GraphQLErrorCode';
import { CustomGraphQLError } from './CustomGraphQLError';

export class GraphQLNotFoundError extends CustomGraphQLError {
  constructor() {
    super('Not Found', GraphQLErrorCode.NOT_FOUND);
  }
}
