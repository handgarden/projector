import { Args, ID, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { SlideModel } from '../model/Slide.model';
import { SlideLoader } from '../loader/SlideLoader';
import { SlideGqlService } from '../SlideGql.service';
import { ParseIntPipe } from '@nestjs/common';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { SlideImageModel } from '../model/SlideImage.model';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';

@GqlAuth()
@Resolver(() => SlideModel)
export class SlideQueryResolver {
  constructor(
    private readonly slideService: SlideGqlService,
    private readonly slideLoader: SlideLoader,
  ) {}

  @Query(() => SlideModel)
  async slide(
    @GqlUser() user: TokenUser,
    @Args('slideId', { type: () => ID }, ParseIntPipe) slideId: number,
  ) {
    return this.slideService.getSlide({ slideId, userId: user.id });
  }

  @ResolveField(() => [SlideImageModel])
  images(@Root() slide: SlideModel) {
    return this.slideLoader.loadImagesById.load(slide.id);
  }
}
