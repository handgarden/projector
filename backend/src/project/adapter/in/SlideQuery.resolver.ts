import { Args, ID, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { SlideResponse } from '../dto/response/Slide.response';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
// import { SlideImageResponse } from '../dto/response/SlideImage.response';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { SlideQueryUseCase } from '../../application/port/in/SlideQueryUseCase';
import { SlideImageResponse } from '../dto/response/SlideImage.response';
import { SlideBatchQueryUseCase } from '../../application/port/in/SlideBatchQueryUseCase';

@GqlAuth()
@Resolver(() => SlideResponse)
export class SlideQueryResolver {
  constructor(
    @Inject(SlideQueryUseCase)
    private readonly slideQueryUseCase: SlideQueryUseCase,
    @Inject(SlideBatchQueryUseCase)
    private readonly slideBatchQueryUseCase: SlideBatchQueryUseCase,
  ) {}

  @Query(() => SlideResponse)
  async slide(
    @GqlUser() user: TokenUser,
    @Args('slideId', { type: () => ID }, ParseIntPipe) slideId: number,
  ): Promise<SlideResponse> {
    const slide = await this.slideQueryUseCase.getSlide(slideId);
    return SlideResponse.fromDto(slide);
  }

  @ResolveField(() => [SlideImageResponse], { nullable: 'items' })
  async images(@Root() slide: SlideResponse): Promise<SlideImageResponse[]> {
    const slideImages =
      await this.slideBatchQueryUseCase.loadSlideImagesBySlideId(
        parseInt(slide.id, 10),
      );
    return slideImages.map((image) => SlideImageResponse.fromDto(image));
  }
}
