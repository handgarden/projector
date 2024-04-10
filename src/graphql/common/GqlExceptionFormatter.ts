import { GraphQLFormattedError } from 'graphql';
import { CustomValidationError } from '../../common/filter/validation/CustomValidationError';
import { ResponseStatus } from '../../common/response/ResponseStatus';

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
  console.log(originalError);
  console.log(originalError && originalError['statusCode']);

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
