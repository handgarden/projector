import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { instanceToPlain } from 'class-transformer';
import { RestTemplate } from '../response/RestTemplate';
import { ResponseStatusConvertor } from '../response/ResponseStatusConvertor';

@Catch()
export class CustomGlobalFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const isHttpException = exception instanceof HttpException;
    if (!isHttpException) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(instanceToPlain(RestTemplate.INTERNAL_SERVER_ERROR()));
    }

    const status = exception.getStatus();

    const responseBody = exception.getResponse();

    response
      .status(status)
      .json(
        instanceToPlain(
          RestTemplate.ERROR(
            responseBody['message'] ?? '서버 에러가 발생했습니다.',
            ResponseStatusConvertor.convertToResponseStatus(status),
          ),
        ),
      );
  }
}
