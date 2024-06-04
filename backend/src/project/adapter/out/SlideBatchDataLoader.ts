import { Injectable, Scope } from '@nestjs/common';
import { SlideBatchLoadPort } from '../../application/port/out/SlideBatchLoadPort';
import { SlidePersistencePort } from '../../application/port/out/SlidePersistencePort';
import * as DataLoader from 'dataloader';

@Injectable({
  scope: Scope.REQUEST,
})
export class SlideBatchDataLoader implements SlideBatchLoadPort {
  constructor(private readonly slidePersistencePort: SlidePersistencePort) {}

  loadSlidesByProjectId = new DataLoader(async (projectIds: number[]) => {
    const projectIdToSlidesMap =
      await this.slidePersistencePort.findSlidesByProjectIds(projectIds);
    return projectIds.map((id) => projectIdToSlidesMap[id] ?? []);
  });
}
