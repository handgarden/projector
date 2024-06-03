import { BatchLoader } from '../../../../common/type/BatchLoader';
import { Slide } from '../../../domain/Slide.entity';

export interface SlideBatchLoadPort {
  loadSlidesByProjectId: BatchLoader<number, Slide[]>;
}

export const SlideBatchLoadPort = Symbol.for('SlideBatchLoadPort');
