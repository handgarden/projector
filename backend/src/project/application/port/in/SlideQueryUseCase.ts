import { SlideDto } from '../../dto/Slide.dto';

export interface SlideQueryUseCase {
  getSlide(id: number): Promise<SlideDto>;
}

export const SlideQueryUseCase = Symbol('SlideQueryUseCase');
