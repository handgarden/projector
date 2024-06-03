import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { SlideResponse } from '../dto/response/Slide.response';
import { ParseIntPipe } from '@nestjs/common';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
// import { SlideImageResponse } from '../dto/response/SlideImage.response';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { SlideQueryUseCase } from '../../application/ports/in/SlideQueryUseCase';

@GqlAuth()
@Resolver(() => SlideResponse)
export class SlideQueryResolver {
  constructor(private readonly slideQueryUseCase: SlideQueryUseCase) {}

  @Query(() => SlideResponse)
  async slide(
    @GqlUser() user: TokenUser,
    @Args('slideId', { type: () => ID }, ParseIntPipe) slideId: number,
  ): Promise<SlideResponse> {
    const slide = await this.slideQueryUseCase.getSlide(slideId);
    return SlideResponse.fromDto(slide);
  }

  // @ResolveField(() => [SlideImageResponse], { nullable: 'items' })
  // async images(@Root() slide: SlideResponse): Promise<SlideImageResponse[]> {
  //   return this.slideLoader.loadImagesById.load(slide.id);
  // }
}
