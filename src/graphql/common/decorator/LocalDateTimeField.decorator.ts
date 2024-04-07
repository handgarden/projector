import { LocalDateTime } from '@js-joda/core';
import { applyDecorators } from '@nestjs/common';
import { LocalDateTimeScalar } from '../scalar/LocalDateTimeScalar';
import { Transform, Type } from 'class-transformer';
import { Field, FieldOptions } from '@nestjs/graphql';

type LocalDateTimeFieldOption = {
  fieldOption?: FieldOptions<LocalDateTime>;
};

export const LocalDateTimeField = (options?: LocalDateTimeFieldOption) =>
  applyDecorators(
    Field(() => LocalDateTimeScalar, options?.fieldOption),
    Type(() => LocalDateTime),
    Transform(({ value }) => LocalDateTime.parse(value), { toClassOnly: true }),
    Transform(({ value }) => value.toString(), { toPlainOnly: true }),
  );
