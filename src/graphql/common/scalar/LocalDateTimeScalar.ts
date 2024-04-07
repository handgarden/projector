import { LocalDateTime } from '@js-joda/core';
import { GraphQLScalarType, StringValueNode } from 'graphql';
import { DateTimeUtils } from '../../../util/DateTImeUtils';
import { CustomGraphQLScalarParseError } from '../exception/CustomGraphQLScalarParseError';

function validate(date: unknown): LocalDateTime | never {
  if (typeof date !== 'string') {
    throw new CustomGraphQLScalarParseError(LocalDateTime.name, date);
  }

  const dateTime = DateTimeUtils.toLocalDateTimeFromString(date as string);
  if (dateTime.isNil()) {
    throw new CustomGraphQLScalarParseError(LocalDateTime.name, date);
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
