import { Nil } from '../../../../common/nil/Nil';
import { Slide } from '../../../domain/Slide.entity';
import { SlideImage } from '../../../domain/SlideImage.entity';

export interface SlidePersistencePort {
  findSlidesByProjectIds(projectIds: number[]): Promise<{
    [projectId: number]: Slide[];
  }>;
  findSlideById(id: number): Promise<Nil<Slide>>;
  findSlideImagesBySlideIds(slideIds: number[]): Promise<SlideImage[]>;
}

export const SlidePersistencePort = Symbol.for('SlidePersistencePort');
