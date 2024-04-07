import { LocalDate } from '@js-joda/core';
import { GraphQLScalarType, StringValueNode } from 'graphql';
import { DateTimeUtils } from '../../../util/DateTImeUtils';
import { CustomGraphQLScalarParseError } from '../exception/CustomGraphQLScalarParseError';

function validate(date: unknown): LocalDate | never {
  if (typeof date !== 'string') {
    throw new CustomGraphQLScalarParseError(LocalDate.name, date);
  }

  const dateTime = DateTimeUtils.toLocalDateFromString(date as string);
  if (dateTime.isNil()) {
    throw new CustomGraphQLScalarParseError(LocalDate.name, date);
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
