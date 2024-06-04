import { Nil } from '../../../../common/nil/Nil';
import { Slide } from '../../../domain/Slide.entity';

export interface SlidePersistencePort {
  findSlidesByProjectIds(projectIds: number[]): Promise<{
    [projectId: number]: Slide[];
  }>;
  findSlideById(id: number): Promise<Nil<Slide>>;
}

export const SlidePersistencePort = Symbol.for('SlidePersistencePort');
