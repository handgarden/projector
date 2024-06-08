import { Inject, Injectable } from '@nestjs/common';
import { SlideBatchQueryUseCase } from '../port/in/SlideBatchQueryUseCase';
import { SlideDto } from '../dto/Slide.dto';
import { SlideBatchLoadPort } from '../port/out/SlideBatchLoadPort';
import { SlideImageDto } from '../dto/SlideImage.dto';

@Injectable()
export class SlideBatchQueryService implements SlideBatchQueryUseCase {
  constructor(
    @Inject(SlideBatchLoadPort)
    private readonly slideBatchLoadPort: SlideBatchLoadPort,
  ) {}

  async loadSlidesByProjectId(projectId: number): Promise<SlideDto[]> {
    const slides =
      await this.slideBatchLoadPort.loadSlidesByProjectId.load(projectId);
    return Promise.all(slides.map(SlideDto.fromEntity));
  }

  async loadSlideImagesBySlideId(slideId: number): Promise<SlideImageDto[]> {
    const slideImages =
      await this.slideBatchLoadPort.loadSlideImagesBySlideId.load(slideId);
    return Promise.all(slideImages.map(SlideImageDto.fromEntity));
  }
}
