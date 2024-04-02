import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { CustomValidationError } from './validation/CustomValidationError';
import { RestTemplate } from '../response/RestTemplate';
import { ResponseStatus } from '../response/ResponseStatus';
import { BadParameterError } from './validation/BadParameterError';
import { Request } from 'express';
import { RestApiExceptionFilter } from './RestApiExceptionFilter';

@Catch(BadParameterError)
export class BadParameterErrorFilter
  implements ExceptionFilter, RestApiExceptionFilter
{
  catch(exception: BadParameterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    if (this.isNotRestApiRequest(request)) {
      throw exception;
    }

    const response = ctx.getResponse();
    const status = exception.getStatus();

    const responseBody = exception.getResponse() as {
      message: CustomValidationError[];
    };

    response
      .status(status)
      .json(
        instanceToPlain(
          RestTemplate.ERROR_WITH_DATA<CustomValidationError[]>(
            '요청 값에 문제가 있습니다.',
            ResponseStatus.BAD_PARAMETER,
            responseBody.message,
          ),
        ),
      );
  }

  isNotRestApiRequest(request: Request) {
    return request.url.includes('/api');
  }
}
