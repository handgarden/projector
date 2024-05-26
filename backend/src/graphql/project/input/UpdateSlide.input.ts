import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateSlideInput } from './CreateSlide.input';

@InputType()
export class UpdateSlideInput extends CreateSlideInput {
  @Field(() => ID)
  slideId: string;
}
