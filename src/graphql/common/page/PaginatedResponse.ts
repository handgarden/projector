import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginatedType } from '../../../common/page/Paginated';

export function Paginated<T extends object>(
  classRef: Type<T>,
): Type<PaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedClass implements PaginatedType<T> {
    @Field(() => [classRef])
    public items: T[];

    @Field(() => Int)
    public total: number;

    @Field(() => Boolean)
    public hasNext: boolean;
  }

  return PaginatedClass as Type<PaginatedType<T>>;
}
