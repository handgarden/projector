import { Args, ID, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { SlideModel } from '../model/Slide.model';
import { SlideLoader } from '../loader/SlideLoader';
import { SlideGqlService } from '../SlideGql.service';
import { ParseIntPipe } from '@nestjs/common';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { SlideImageModel } from '../model/SlideImage.model';

@GqlAuth()
@Resolver(() => SlideModel)
export class SlideQueryResolver {
  constructor(
    private readonly slideService: SlideGqlService,
    private readonly slideLoader: SlideLoader,
  ) {}

  @Query(() => SlideModel)
  async slide(
    @Args('projectId', { type: () => ID }, ParseIntPipe) projectId: number,
    @Args('seq', { type: () => Number }, ParseIntPipe) seq: number,
  ) {
    return this.slideService.getSlide({ projectId, seq });
  }

  @ResolveField(() => [SlideImageModel])
  images(@Root() slide: SlideModel) {
    return this.slideLoader.loadImagesById.load(slide.id);
  }
}
