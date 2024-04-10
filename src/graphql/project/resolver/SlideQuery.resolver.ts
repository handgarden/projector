import {
  Args,
  ID,
  Int,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { UploadFileModel } from '../../file/model/UploadFile.model';
import { SlideModel } from '../model/Slide.model';
import { SlideLoader } from '../loader/SlideLoader';
import { SlideGqlService } from '../SlideGql.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => SlideModel)
export class SlideQueryResolver {
  constructor(
    private readonly slideService: SlideGqlService,
    private readonly slideLoader: SlideLoader,
  ) {}

  @Query(() => SlideModel)
  async slide(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.slideService.getSlide(id);
  }

  @ResolveField(() => [UploadFileModel])
  images(@Root() slide: SlideModel) {
    return this.slideLoader.loadImagesById.load(slide.id);
  }
}
