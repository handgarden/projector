import { HttpStatus } from '@nestjs/common';
import { ResponseStatus } from './ResponseStatus';

export class ResponseStatusConvertor {
  static convertToHttpStatus(responseStatus: ResponseStatus): HttpStatus {
    switch (responseStatus) {
      case ResponseStatus.OK:
        return HttpStatus.OK;
      case ResponseStatus.SERVER_ERROR:
        return HttpStatus.INTERNAL_SERVER_ERROR;
      case ResponseStatus.BAD_PARAMETER:
        return HttpStatus.BAD_REQUEST;
      case ResponseStatus.UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case ResponseStatus.FORBIDDEN:
        return HttpStatus.FORBIDDEN;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  static convertToResponseStatus(httpStatus: HttpStatus): ResponseStatus {
    switch (httpStatus) {
      case HttpStatus.OK:
        return ResponseStatus.OK;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return ResponseStatus.SERVER_ERROR;
      case HttpStatus.BAD_REQUEST:
        return ResponseStatus.BAD_PARAMETER;
      case HttpStatus.UNAUTHORIZED:
        return ResponseStatus.UNAUTHORIZED;
      case HttpStatus.FORBIDDEN:
        return ResponseStatus.FORBIDDEN;
      default:
        return ResponseStatus.SERVER_ERROR;
    }
  }
}
