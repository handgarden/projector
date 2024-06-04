import { SlideDto } from '../../dto/Slide.dto';

export interface SlideBatchQueryUseCase {
  loadSlidesByProjectId(projectId: number): Promise<SlideDto[]>;
}

export const SlideBatchQueryUseCase = Symbol('SlideBatchQueryUseCase');
