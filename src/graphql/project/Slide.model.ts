import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SlideModel {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  seq: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
