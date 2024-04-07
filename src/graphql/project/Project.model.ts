import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;
}
