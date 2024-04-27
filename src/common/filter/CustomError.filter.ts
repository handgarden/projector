import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { CustomError } from './error/CustomError';
import { RestApiExceptionFilter } from './RestApiExceptionFilter';
import { GqlContextType } from '@nestjs/graphql';
import { RestTemplate } from '../response/RestTemplate';
import { ResponseStatus } from '../response/ResponseStatus';
import { instanceToPlain } from 'class-transformer';
import { CustomForbiddenError } from './error/CustomForbiddenError';
import { CustomBadRequestError } from './error/CustomBadRequestError';

@Catch(CustomError)
export class CustomErrorFilter
  implements ExceptionFilter, RestApiExceptionFilter
{
  catch(exception: CustomError, host: ArgumentsHost) {
    if (this.isGraphQLRequest(host)) {
      throw exception;
    }

    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    if (exception instanceof CustomForbiddenError) {
      return response
        .status(HttpStatus.FORBIDDEN)
        .json(
          instanceToPlain(
            RestTemplate.ERROR('권한이 없습니다.', ResponseStatus.FORBIDDEN),
          ),
        );
    }

    if (exception instanceof CustomBadRequestError) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          instanceToPlain(
            RestTemplate.ERROR(exception.message, ResponseStatus.BAD_REQUEST),
          ),
        );
    }

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(instanceToPlain(RestTemplate.INTERNAL_SERVER_ERROR()));
  }

  isGraphQLRequest(host: ArgumentsHost): boolean {
    return host.getType<GqlContextType>() === 'graphql';
  }
}
