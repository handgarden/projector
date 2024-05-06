import { Field, ID, InputType } from '@nestjs/graphql';
import { ScrollableType } from '../../../common/page/InfiniteScrollableType';

@InputType()
export class ScrollableInput implements ScrollableType<string> {
  @Field(() => ID, { nullable: true })
  lastKey?: string;

  @Field(() => Number)
  size: number;
}
