import { LocalDate } from '@js-joda/core';
import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { LocalDateScalar } from '../scalar/LocalDateScalar';
import { Transform, Type } from 'class-transformer';

type LocalDateTimeFieldOption = {
  fieldOption?: FieldOptions<LocalDate>;
};

export const LocalDateTimeField = (options?: LocalDateTimeFieldOption) =>
  applyDecorators(
    Field(() => LocalDateScalar, options?.fieldOption),
    Type(() => LocalDate),
    Transform(({ value }) => LocalDate.parse(value), { toClassOnly: true }),
    Transform(({ value }) => value.toString(), { toPlainOnly: true }),
  );
