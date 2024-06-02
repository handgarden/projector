import { Args, ID, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { SlideResponse } from '../dto/response/Slide.response';
import { SlideLoader } from '../../../graphql/project/loader/Slide.loader';
import { SlideGqlService } from '../../application/service/SlideGql.service';
import { ParseIntPipe } from '@nestjs/common';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { SlideImageResponse } from '../dto/response/SlideImage.response';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';

@GqlAuth()
@Resolver(() => SlideResponse)
export class SlideQueryResolver {
  constructor(
    private readonly slideService: SlideGqlService,
    private readonly slideLoader: SlideLoader,
  ) {}

  @Query(() => SlideResponse)
  async slide(
    @GqlUser() user: TokenUser,
    @Args('slideId', { type: () => ID }, ParseIntPipe) slideId: number,
  ): Promise<SlideResponse> {
    return this.slideService.getSlide({
      slideId,
      userId: user.id,
    });
  }

  @ResolveField(() => [SlideImageResponse], { nullable: 'items' })
  async images(@Root() slide: SlideResponse): Promise<SlideImageResponse[]> {
    return this.slideLoader.loadImagesById.load(slide.id);
  }
}
