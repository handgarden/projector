import { LocalDateTime } from '@js-joda/core';
import { ObjectType } from '@nestjs/graphql';
import { LocalDateTimeField } from './decorator/LocalDateTimeField.decorator';

@ObjectType()
export class BaseTimeResponse {
  @LocalDateTimeField()
  createdAt: LocalDateTime;

  @LocalDateTimeField()
  updatedAt: LocalDateTime;
}
