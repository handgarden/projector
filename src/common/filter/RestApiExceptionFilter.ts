import { Request } from 'express';

export interface RestApiExceptionFilter {
  isNotRestApiRequest: (request: Request) => boolean;
}
