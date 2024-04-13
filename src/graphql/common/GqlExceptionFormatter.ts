import { GraphQLFormattedError } from 'graphql';
import { CustomValidationError } from '../../common/filter/validation/CustomValidationError';
import { ResponseStatus } from '../../common/response/ResponseStatus';
import { CustomGraphQLError } from './exception/CustomGraphQLError';
import { DomainError } from '../../core/entity/exception/DomainError';
import { DomainForbiddenError } from '../../core/entity/exception/DomainForbiddenError';

type OriginalError = {
  statusCode: number;
  message: string | object;
};

export function GqlExceptionFormatter(
  error: GraphQLFormattedError,
): GraphQLFormattedError {
  const originalError = error.extensions?.originalError as
    | undefined
    | OriginalError;

  if (originalError) {
    const message = originalError.message as string | object;
    if (Array.isArray(message) && message[0] instanceof CustomValidationError) {
      const extensions = {
        code: ResponseStatus.BAD_PARAMETER,
        message: `요청 값에 문제가 있습니다.`,
        data: message,
      };
      return {
        message: `요청 값에 문제가 있습니다.`,
        extensions,
      };
    }
    if (message[0] instanceof CustomGraphQLError) {
      return {
        message: message[0].message,
        extensions: {
          code: message[0].code,
          message: message[0].message,
        },
      };
    }
    if (message[0] instanceof DomainError) {
      return domainErrorFormatter(message[0]);
    }
  }

  return process.env.NODE_ENV === 'production'
    ? {
        message: error.message,
        extensions: {
          code: error.extensions?.code ?? ResponseStatus.SERVER_ERROR,
          message: error.extensions?.message ?? '서버 에러가 발생했습니다.',
        },
      }
    : error;
}

function domainErrorFormatter(error: DomainError): GraphQLFormattedError {
  if (error instanceof DomainForbiddenError) {
    return {
      message: error.message,
      extensions: {
        code: ResponseStatus.FORBIDDEN,
        message: '권한이 없습니다.',
      },
    };
  }

  return {
    message: error.message,
    extensions: {
      code: ResponseStatus.SERVER_ERROR,
      message: '서버 에러가 발생했습니다.',
    },
  };
}
