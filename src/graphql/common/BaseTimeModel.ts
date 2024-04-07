import { LocalDateTime } from '@js-joda/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { LocalDateTimeScalar } from './scalar/LocalDateTimeScalar';

@ObjectType()
export class BaseTimeModel {
  @Field(() => LocalDateTimeScalar)
  createdAt: LocalDateTime;

  @Field(() => LocalDateTimeScalar)
  updatedAt: LocalDateTime;
}
