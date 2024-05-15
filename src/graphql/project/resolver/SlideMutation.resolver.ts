import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { SlideResponse } from '../response/Slide.response';
import { CreateSlideInput } from '../input/CreateSlide.input';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { SlideGqlService } from '../SlideGql.service';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { UpdateSlideInput } from '../input/UpdateSlide.input';
import { ParseIntPipe } from '@nestjs/common';

@GqlAuth()
@Resolver(() => SlideResponse)
export class SlideMutationResolver {
  constructor(private readonly slideService: SlideGqlService) {}

  @Mutation(() => SlideResponse)
  createSlide(
    @GqlUser() user: TokenUser,
    @Args('slide', { type: () => CreateSlideInput }) slide: CreateSlideInput,
  ): Promise<SlideResponse> {
    return this.slideService.createSlide({
      userId: user.id,
      slideInput: slide,
    });
  }

  @Mutation(() => SlideResponse)
  updateSlide(
    @GqlUser() user: TokenUser,
    @Args('slide', { type: () => UpdateSlideInput }) slide: UpdateSlideInput,
  ): Promise<SlideResponse> {
    return this.slideService.updateSlide({
      userId: user.id,
      slideInput: slide,
    });
  }

  @Mutation(() => Boolean)
  deleteSlide(
    @GqlUser() user: TokenUser,
    @Args('slideId', { type: () => ID }, ParseIntPipe) slideId: number,
  ): Promise<boolean> {
    return this.slideService.deleteSlide({
      userId: user.id,
      slideId,
    });
  }
}
