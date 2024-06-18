import { SlideDto } from '../../dto/Slide.dto';
import { SlideImageDto } from '../../dto/SlideImage.dto';

export interface SlideBatchQueryUseCase {
  loadSlidesByProjectId(projectId: number): Promise<SlideDto[]>;
  loadSlideImagesBySlideId(slideId: number): Promise<SlideImageDto[]>;
}

export const SlideBatchQueryUseCase = Symbol('SlideBatchQueryUseCase');
