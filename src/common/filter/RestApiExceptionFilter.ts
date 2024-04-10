import { ArgumentsHost } from '@nestjs/common';

export interface RestApiExceptionFilter {
  isGraphQLRequest(host: ArgumentsHost): boolean;
}
