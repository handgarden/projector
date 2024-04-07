import { LocalDate } from '@js-joda/core';
import { GraphQLScalarType, StringValueNode } from 'graphql';
import { DateTimeUtils } from '../../../util/DateTImeUtils';
import { CustomGraphQLScalarParseError } from '../exception/CustomGraphQLScalarParseError';

function validate(value: unknown): LocalDate | never {
  if (value instanceof LocalDate) {
    return value;
  }

  if (typeof value !== 'string') {
    throw new CustomGraphQLScalarParseError(LocalDate.name, value);
  }

  const dateTime = DateTimeUtils.toLocalDateFromString(value);

  if (dateTime.isNil()) {
    throw new CustomGraphQLScalarParseError(LocalDate.name, value);
  }

  return dateTime.unwrap();
}

export const LocalDateScalar = new GraphQLScalarType({
  name: LocalDate.name,
  description: 'LocalDate custom scalar type',
  serialize: (value) => DateTimeUtils.toString(validate(value)),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => validate((ast as StringValueNode).value),
});
