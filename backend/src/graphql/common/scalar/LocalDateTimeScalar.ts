import { LocalDateTime } from '@js-joda/core';
import { GraphQLScalarType, StringValueNode } from 'graphql';
import { DateTimeUtils } from '../../../util/DateTImeUtils';
import { CustomGraphQLScalarParseError } from '../exception/CustomGraphQLScalarParseError';

function validate(value: any) {
  if (value instanceof LocalDateTime) {
    return value;
  }

  if (typeof value !== 'string') {
    throw new CustomGraphQLScalarParseError(LocalDateTime.name, value);
  }

  const dateTime = DateTimeUtils.toLocalDateTimeFromString(value);

  if (dateTime.isNil()) {
    throw new CustomGraphQLScalarParseError(LocalDateTime.name, value);
  }

  return dateTime.unwrap();
}

export const LocalDateTimeScalar = new GraphQLScalarType({
  name: LocalDateTime.name,
  description: 'LocalDateTime custom scalar type',
  serialize: (value) => DateTimeUtils.toString(validate(value)),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => validate((ast as StringValueNode).value),
});
