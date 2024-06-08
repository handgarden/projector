import { BatchLoader } from '../../../../common/type/BatchLoader';
import { Slide } from '../../../domain/Slide.entity';
import { SlideImage } from '../../../domain/SlideImage.entity';

export interface SlideBatchLoadPort {
  loadSlidesByProjectId: BatchLoader<number, Slide[]>;
  loadSlideImagesBySlideId: BatchLoader<number, SlideImage[]>;
}

export const SlideBatchLoadPort = Symbol.for('SlideBatchLoadPort');
