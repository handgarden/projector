import { Inject, Injectable, Scope } from '@nestjs/common';
import { SlideBatchLoadPort } from '../../application/port/out/SlideBatchLoadPort';
import { SlidePersistencePort } from '../../application/port/out/SlidePersistencePort';
import * as DataLoader from 'dataloader';
import { BatchLoader } from '../../../common/type/BatchLoader';
import { SlideImage } from '../../domain/SlideImage.entity';

@Injectable({
  scope: Scope.REQUEST,
})
export class SlideBatchDataLoader implements SlideBatchLoadPort {
  constructor(
    @Inject(SlidePersistencePort)
    private readonly slidePersistencePort: SlidePersistencePort,
  ) {}

  loadSlidesByProjectId = new DataLoader(async (projectIds: number[]) => {
    const projectIdToSlidesMap =
      await this.slidePersistencePort.findSlidesByProjectIds(projectIds);
    return projectIds.map((id) => projectIdToSlidesMap[id] ?? []);
  });

  loadSlideImagesBySlideId: BatchLoader<number, SlideImage[]> = new DataLoader(
    async (slideIds: number[]) => {
      const slideImages =
        await this.slidePersistencePort.findSlideImagesBySlideIds(slideIds);
      const slideImageMap = new Map<number, SlideImage[]>();
      slideImages.forEach((slideImage) => {
        const images = slideImageMap.get(slideImage.slideId) ?? [];
        images.push(slideImage);
        slideImageMap.set(slideImage.slideId, images);
      });
      return slideIds.map((id) => slideImageMap.get(id) ?? []);
    },
  );
}
