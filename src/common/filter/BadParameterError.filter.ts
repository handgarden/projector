import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { CustomValidationError } from './validation/CustomValidationError';
import { RestTemplate } from '../response/RestTemplate';
import { ResponseStatus } from '../response/ResponseStatus';
import { BadParameterError } from './validation/BadParameterError';

@Catch(BadParameterError)
export class BadParameterErrorFilter implements ExceptionFilter {
  catch(exception: BadParameterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

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
}
