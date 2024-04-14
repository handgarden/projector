import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SlideModel } from '../model/Slide.model';
import { CreateSlideInput } from '../input/CreateSlide.input';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { SlideGqlService } from '../SlideGql.service';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { UpdateSlideInput } from '../input/UpdateSlide.input';

@GqlAuth()
@Resolver(() => SlideModel)
export class SlideMutationResolver {
  constructor(private readonly slideService: SlideGqlService) {}

  @Mutation(() => SlideModel)
  createSlide(
    @GqlUser() user: TokenUser,
    @Args('slide', { type: () => CreateSlideInput }) slide: CreateSlideInput,
  ) {
    return this.slideService.createSlide({
      userId: user.id,
      slideInput: slide,
    });
  }

  @Mutation(() => SlideModel)
  updateSlide(
    @GqlUser() user: TokenUser,
    @Args('slide', { type: () => UpdateSlideInput }) slide: UpdateSlideInput,
  ) {
    return this.slideService.updateSlide({
      userId: user.id,
      slideInput: slide,
    });
  }
}
